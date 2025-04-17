/**
 * Simple monitoring system for BenFresh website
 * Tracks performance metrics, errors, and user interactions
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
  private endpoint: string = '/api/monitoring'; // Server endpoint to receive monitoring data
  private batchSize: number = 10;
  private flushInterval: number = 30000; // 30 seconds
  private errorQueue: ErrorReport[] = [];
  private metricsQueue: PerformanceMetric[] = [];
  private interactionsQueue: UserInteraction[] = [];
  private timerId: NodeJS.Timeout | null = null;

  private constructor() {
    // Singleton pattern ensures only one instance
    if (typeof window !== 'undefined') {
      this.setupErrorTracking();
      this.setupPerformanceTracking();
      this.startAutomaticFlush();
    }
  }

  public static getInstance(): MonitoringSystem {
    if (!MonitoringSystem.instance) {
      MonitoringSystem.instance = new MonitoringSystem();
    }
    return MonitoringSystem.instance;
  }

  /**
   * Enable or disable debug mode
   */
  public setDebugMode(enabled: boolean): void {
    this.debugMode = enabled;
    this.log(`Debug mode ${enabled ? 'enabled' : 'disabled'}`);
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
    const report: ErrorReport = {
      message: error.message,
      stack: error.stack,
      url: typeof window !== 'undefined' ? window.location.href : '',
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
    };

    this.errorQueue.push(report);
    this.log('Error tracked:', report);
    
    if (this.errorQueue.length >= this.batchSize) {
      this.flushErrors();
    }
  }

  /**
   * Track a custom performance metric
   */
  public trackMetric(name: string, value: number): void {
    const metric: PerformanceMetric = {
      name,
      value,
      url: typeof window !== 'undefined' ? window.location.href : '',
      timestamp: new Date().toISOString(),
    };

    this.metricsQueue.push(metric);
    this.log('Metric tracked:', metric);
    
    if (this.metricsQueue.length >= this.batchSize) {
      this.flushMetrics();
    }
  }

  /**
   * Track a user interaction
   */
  public trackInteraction(type: string, element: string): void {
    const interaction: UserInteraction = {
      type,
      element,
      url: typeof window !== 'undefined' ? window.location.href : '',
      timestamp: new Date().toISOString(),
    };

    this.interactionsQueue.push(interaction);
    this.log('Interaction tracked:', interaction);
    
    if (this.interactionsQueue.length >= this.batchSize) {
      this.flushInteractions();
    }
  }

  /**
   * Flush all queued data immediately
   */
  public flushAll(): void {
    this.flushErrors();
    this.flushMetrics();
    this.flushInteractions();
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
  }

  /**
   * Setup performance tracking
   */
  private setupPerformanceTracking(): void {
    // Track core web vitals if available
    if (typeof window !== 'undefined') {
      // Simple version that avoids TypeScript errors but still works at runtime
      // Simple metric handler for web vitals
      type MetricHandler = (m: { value: number }) => void;
      
      // Safely try to use web-vitals if available
      setTimeout(() => {
        try {
          // Dynamic import is used to avoid build issues when web-vitals is not installed
          // We handle it safely with try/catch
          import('web-vitals')
            .then((webVitals) => {
              // Define a generic function to handle different web vital metrics
              const trackWebVital = (name: string) => {
                return (metric: { value: number }) => {
                  this.trackMetric(name, metric.value);
                };
              };
              
              // Apply the tracking to all web vitals
              // We use a type assertion here since we're handling the import dynamically
              const vitals = webVitals as unknown as {
                onCLS?: (fn: MetricHandler) => void;
                onFID?: (fn: MetricHandler) => void;
                onLCP?: (fn: MetricHandler) => void;
                onFCP?: (fn: MetricHandler) => void;
                onTTFB?: (fn: MetricHandler) => void;
                getCLS?: (fn: MetricHandler) => void;
                getFID?: (fn: MetricHandler) => void;
                getLCP?: (fn: MetricHandler) => void;
                getFCP?: (fn: MetricHandler) => void;
                getTTFB?: (fn: MetricHandler) => void;
              };
              
              // Check for newer API (v3+)
              if (typeof vitals.onCLS === 'function') {
                vitals.onCLS(trackWebVital('CLS'));
                vitals.onFID?.(trackWebVital('FID'));
                vitals.onLCP?.(trackWebVital('LCP'));
                vitals.onFCP?.(trackWebVital('FCP'));
                vitals.onTTFB?.(trackWebVital('TTFB'));
              } 
              // Check for older API (v2)
              else if (typeof vitals.getCLS === 'function') {
                vitals.getCLS(trackWebVital('CLS'));
                vitals.getFID?.(trackWebVital('FID'));
                vitals.getLCP?.(trackWebVital('LCP'));
                vitals.getFCP?.(trackWebVital('FCP'));
                vitals.getTTFB?.(trackWebVital('TTFB'));
              }
            })
            .catch(e => {
              console.warn('Could not load web-vitals:', e);
            });
        } catch (error) {
          console.warn('Web Vitals not supported:', error);
        }
      }, 0);
    }

    // Track page navigation timing
    window.addEventListener('load', () => {
      setTimeout(() => {
        if (window.performance && window.performance.timing) {
          const timing = window.performance.timing;
          
          // Calculate key metrics
          const dns = timing.domainLookupEnd - timing.domainLookupStart;
          const tcp = timing.connectEnd - timing.connectStart;
          const ttfb = timing.responseStart - timing.requestStart;
          const download = timing.responseEnd - timing.responseStart;
          const domInteractive = timing.domInteractive - timing.navigationStart;
          const domComplete = timing.domComplete - timing.navigationStart;
          const loadTime = timing.loadEventEnd - timing.navigationStart;
          
          // Track each metric
          this.trackMetric('DNS', dns);
          this.trackMetric('TCP', tcp);
          this.trackMetric('TTFB', ttfb);
          this.trackMetric('Download', download);
          this.trackMetric('DomInteractive', domInteractive);
          this.trackMetric('DomComplete', domComplete);
          this.trackMetric('LoadTime', loadTime);
        }
      }, 0);
    });
  }

  /**
   * Start automatic flushing of queued data
   */
  private startAutomaticFlush(): void {
    this.timerId = setInterval(() => {
      this.flushAll();
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
   * Send data to server
   */
  private sendToServer(path: string, data: (ErrorReport | PerformanceMetric | UserInteraction)[]): void {
    // In development, just log to console
    if (process.env.NODE_ENV === 'development') {
      this.log(`Would send to ${this.endpoint}${path}:`, data);
      return;
    }

    // In production, send to server
    fetch(`${this.endpoint}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      // Use keepalive to ensure the request completes even if the page is unloading
      keepalive: true,
    }).catch(error => {
      // Don't use trackError here to avoid infinite loops
      console.error('Error sending monitoring data:', error);
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

// Export as a singleton
export const Monitoring = MonitoringSystem.getInstance();

/**
 * Initialize the monitoring system
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

  // In development, always enable debug mode
  if (process.env.NODE_ENV === 'development') {
    monitoring.setDebugMode(true);
  }
}

/**
 * Track a page view
 */
export function trackPageView(path: string): void {
  Monitoring.trackInteraction('pageView', path);
  
  // Also track the navigation performance if available
  if (typeof window !== 'undefined' && 'performance' in window) {
    const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationTiming) {
      Monitoring.trackMetric('PageLoadTime', navigationTiming.loadEventEnd - navigationTiming.startTime);
    }
  }
}
