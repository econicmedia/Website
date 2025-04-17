/**
 * Performance-optimized monitoring system for BenFresh website
 * Tracks essential metrics with minimal performance impact
 */

interface ErrorReport {
  message: string;
  stack?: string;
  url: string;
  timestamp: string;
  userAgent: string;
}

interface PerformanceMetric {
  name: string;
  value: number;
  url: string;
  timestamp: string;
}

interface UserInteraction {
  type: string;
  element: string;
  url: string;
  timestamp: string;
}

class MonitoringSystem {
  private static instance: MonitoringSystem;
  private debugMode: boolean = false;
  private endpoint: string = '/api/monitoring';
  private batchSize: number = 20; // Increased batch size for fewer network requests
  private flushInterval: number = 60000; // 60 seconds (increased to reduce network traffic)
  private errorQueue: ErrorReport[] = [];
  private metricsQueue: PerformanceMetric[] = [];
  private interactionsQueue: UserInteraction[] = [];
  private timerId: NodeJS.Timeout | null = null;
  private initialized: boolean = false;
  private pendingWebVitalsImport: boolean = false;

  private constructor() {
    // No initialization in constructor for performance
  }

  public static getInstance(): MonitoringSystem {
    if (!MonitoringSystem.instance) {
      MonitoringSystem.instance = new MonitoringSystem();
    }
    return MonitoringSystem.instance;
  }

  /**
   * Lazily initialize monitoring to reduce initial page load impact
   */
  public initialize(): void {
    if (this.initialized || typeof window === 'undefined') return;
    
    // Defer non-critical initialization with requestIdleCallback
    const initWhenIdle = () => {
      this.setupErrorTracking();
      this.setupPerformanceTracking();
      this.startAutomaticFlush();
      this.initialized = true;
    };
    
    // Use requestIdleCallback if available, otherwise defer with setTimeout
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(initWhenIdle, { timeout: 2000 });
    } else {
      // Delay initialization to not block main thread during page load
      setTimeout(initWhenIdle, 1000);
    }
  }

  /**
   * Enable or disable debug mode
   */
  public setDebugMode(enabled: boolean): void {
    this.debugMode = enabled;
  }

  /**
   * Set custom endpoint for reporting
   */
  public setEndpoint(endpoint: string): void {
    this.endpoint = endpoint;
  }

  /**
   * Track a custom error
   */
  public trackError(error: Error): void {
    // Initialize if not already done
    if (!this.initialized) this.initialize();
    
    const report: ErrorReport = {
      message: error.message,
      stack: error.stack,
      url: typeof window !== 'undefined' ? window.location.href : '',
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
    };

    this.errorQueue.push(report);
    this.log('Error tracked:', report);
    
    // Only flush immediately for errors that exceed batch size
    if (this.errorQueue.length >= this.batchSize) {
      this.flushErrors();
    }
  }

  /**
   * Track a custom performance metric with throttling
   */
  public trackMetric(name: string, value: number): void {
    // Skip if not initialized yet - metrics will be captured on next cycle
    if (!this.initialized) return;
    
    const metric: PerformanceMetric = {
      name,
      value,
      url: typeof window !== 'undefined' ? window.location.href : '',
      timestamp: new Date().toISOString(),
    };

    this.metricsQueue.push(metric);
    this.log('Metric tracked:', metric);
    
    // Don't flush metrics eagerly - wait for batch or interval
  }

  /**
   * Track a user interaction with throttling
   */
  public trackInteraction(type: string, element: string): void {
    // Skip if not initialized yet
    if (!this.initialized) return;
    
    const interaction: UserInteraction = {
      type,
      element,
      url: typeof window !== 'undefined' ? window.location.href : '',
      timestamp: new Date().toISOString(),
    };

    this.interactionsQueue.push(interaction);
    this.log('Interaction tracked:', interaction);
    
    // Don't flush interactions eagerly - wait for batch or interval
  }

  /**
   * Flush all queued data immediately
   */
  public flushAll(): void {
    if (document.visibilityState === 'hidden') {
      // When tab is hidden, use sendBeacon for reliable delivery
      this.flushWithBeacon();
    } else {
      // Standard flush when tab is visible
      this.flushErrors();
      this.flushMetrics();
      this.flushInteractions();
    }
  }

  /**
   * Use sendBeacon for more reliable delivery when page is unloading
   */
  private flushWithBeacon(): void {
    if (typeof navigator.sendBeacon !== 'function') {
      // Fall back to regular flush if sendBeacon not available
      this.flushErrors();
      this.flushMetrics();
      this.flushInteractions();
      return;
    }
    
    // Combine all data for a single beacon
    const allData = {
      errors: this.errorQueue,
      metrics: this.metricsQueue,
      interactions: this.interactionsQueue
    };
    
    // Only send if there's data
    if (this.errorQueue.length || this.metricsQueue.length || this.interactionsQueue.length) {
      const blob = new Blob([JSON.stringify(allData)], { type: 'application/json' });
      navigator.sendBeacon(`${this.endpoint}/all`, blob);
      
      // Clear queues after sending
      this.errorQueue = [];
      this.metricsQueue = [];
      this.interactionsQueue = [];
    }
  }

  /**
   * Setup global error tracking
   */
  private setupErrorTracking(): void {
    window.addEventListener('error', (event) => {
      this.trackError(event.error || new Error(event.message));
    });

    window.addEventListener('unhandledrejection', (event) => {
      const error = event.reason instanceof Error 
        ? event.reason 
        : new Error(String(event.reason));
      this.trackError(error);
    });
    
    // Flush logs when page is hidden or unloaded
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.flushWithBeacon();
      }
    });
    
    window.addEventListener('pagehide', () => {
      this.flushWithBeacon();
    });
  }

  /**
   * Setup performance tracking with lazy loading
   */
  private setupPerformanceTracking(): void {
    // Skip if already loaded or pending
    if (this.pendingWebVitalsImport) return;
    this.pendingWebVitalsImport = true;
    
    // Only load web vitals after page is fully loaded
    window.addEventListener('load', () => {
      // Additional delay to not impact page interaction
      setTimeout(() => {
        this.importWebVitals();
        this.trackNavigationTiming();
      }, 2000);
    });
  }
  
  /**
   * Import web-vitals dynamically and with minimal impact
   */
  private importWebVitals(): void {
    try {
      import('web-vitals')
        .then((webVitals) => {
          // Define a throttled metric handler
          const trackWebVital = (name: string) => {
            return (metric: { value: number }) => {
              // Add small delay to avoid blocking main thread
              setTimeout(() => {
                this.trackMetric(name, metric.value);
              }, 0);
            };
          };
          
          // Only use the modern API (v3+)
          // Use optional chaining for safety
          webVitals.onCLS?.(trackWebVital('CLS'));
          webVitals.onLCP?.(trackWebVital('LCP'));
          
          // Defer less critical metrics
          setTimeout(() => {
            webVitals.onFID?.(trackWebVital('FID'));
            webVitals.onFCP?.(trackWebVital('FCP'));
            webVitals.onTTFB?.(trackWebVital('TTFB'));
          }, 3000);
        })
        .catch(() => { 
          // Fail silently - not critical to application
          this.pendingWebVitalsImport = false;
        });
    } catch (error) {
      // Fail silently
      this.pendingWebVitalsImport = false;
    }
  }
  
  /**
   * Track navigation timing with modern Performance API
   */
  private trackNavigationTiming(): void {
    if (!window.performance || !window.performance.getEntriesByType) return;
    
    try {
      const navEntries = performance.getEntriesByType('navigation');
      if (navEntries && navEntries.length > 0) {
        const navEntry = navEntries[0] as PerformanceNavigationTiming;
        // Only track the most important metrics
        this.trackMetric('TTFB', navEntry.responseStart - navEntry.requestStart);
        this.trackMetric('DomContentLoaded', navEntry.domContentLoadedEventEnd - navEntry.startTime);
        this.trackMetric('LoadComplete', navEntry.loadEventEnd - navEntry.startTime);
      }
    } catch (e) {
      // Fail silently - not critical
    }
  }

  /**
   * Start automatic flushing of queued data
   */
  private startAutomaticFlush(): void {
    this.timerId = setInterval(() => {
      if (document.visibilityState === 'visible') {
        this.flushAll();
      }
    }, this.flushInterval);
  }

  /**
   * Stop automatic flushing
   */
  public stopAutomaticFlush(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  /**
   * Flush error queue
   */
  private flushErrors(): void {
    if (this.errorQueue.length === 0) return;
    
    const errors = [...this.errorQueue];
    this.errorQueue = [];
    
    this.sendToServer('/errors', errors);
  }

  /**
   * Flush metrics queue
   */
  private flushMetrics(): void {
    if (this.metricsQueue.length === 0) return;
    
    const metrics = [...this.metricsQueue];
    this.metricsQueue = [];
    
    this.sendToServer('/metrics', metrics);
  }

  /**
   * Flush interactions queue
   */
  private flushInteractions(): void {
    if (this.interactionsQueue.length === 0) return;
    
    const interactions = [...this.interactionsQueue];
    this.interactionsQueue = [];
    
    this.sendToServer('/interactions', interactions);
  }

  /**
   * Send data to server with batching and error handling
   */
  private sendToServer(path: string, data: (ErrorReport | PerformanceMetric | UserInteraction)[]): void {
    // In development, just log to console
    if (process.env.NODE_ENV === 'development') {
      this.log(`Would send to ${this.endpoint}${path}:`, data);
      return;
    }

    // Skip empty data
    if (data.length === 0) return;

    // In production, send to server
    fetch(`${this.endpoint}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      // Use keepalive to ensure the request completes even if the page is unloading
      keepalive: true,
    }).catch(() => {
      // Fail silently - don't log errors to avoid infinite loops
    });
  }

  /**
   * Log messages when in debug mode
   */
  private log(message: string, ...args: unknown[]): void {
    if (this.debugMode) {
      console.log(`[Monitoring] ${message}`, ...args);
    }
  }
}

// Export as a singleton, but don't initialize immediately
export const Monitoring = MonitoringSystem.getInstance();

/**
 * Initialize the monitoring system with lazy loading
 */
export function initMonitoring(options: { 
  debug?: boolean;
  endpoint?: string;
} = {}): void {
  if (typeof window === 'undefined') return;
  
  const monitoring = MonitoringSystem.getInstance();
  
  if (options.debug !== undefined) {
    monitoring.setDebugMode(options.debug);
  }
  
  if (options.endpoint) {
    monitoring.setEndpoint(options.endpoint);
  }

  // In development, enable debug mode
  if (process.env.NODE_ENV === 'development') {
    monitoring.setDebugMode(true);
  }
  
  // Defer initialization to not impact page load performance
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => monitoring.initialize(), { timeout: 2000 });
  } else {
    // Fallback to setTimeout
    setTimeout(() => monitoring.initialize(), 1000);
  }
}

/**
 * Track a page view with minimal impact
 */
export function trackPageView(path: string): void {
  // Just add to queue - will be processed when system is initialized
  Monitoring.trackInteraction('pageView', path);
}
