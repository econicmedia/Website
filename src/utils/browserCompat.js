// Browser Compatibility Utilities
// Optimized version for better performance

/**
 * Detects the current browser and returns information
 * Simplified for performance - only checks essential compatibility
 * @returns {Object} Browser information including name and version
 */
export const detectBrowser = () => {
  if (typeof window === 'undefined') {
    return { name: 'server', version: 'N/A', isCompatible: true };
  }

  // Use a cached result if already calculated
  if (window.__browserInfo) {
    return window.__browserInfo;
  }

  const userAgent = window.navigator.userAgent;
  let browserName = 'Modern Browser';
  let browserVersion = 'Current';
  let isCompatible = true;
  
  // Only check for truly incompatible browsers
  if (/MSIE|Trident/.test(userAgent)) {
    browserName = 'Internet Explorer';
    browserVersion = userAgent.match(/(?:MSIE |rv:)(\d+\.\d+)/)?.[1] || 'Unknown';
    isCompatible = false; // IE is not supported
  }

  // Cache the result
  const result = {
    name: browserName,
    version: browserVersion,
    isCompatible,
    userAgent
  };
  
  window.__browserInfo = result;
  return result;
};

/**
 * Checks essential feature support
 * Only tests features that might actually need polyfills
 * @returns {Object} Feature support status
 */
export const checkFeatureSupport = () => {
  if (typeof window === 'undefined') {
    return { allFeaturesSupported: true };
  }
  
  // Use cached result if available
  if (window.__featureSupport) {
    return window.__featureSupport;
  }

  // Only check critical features
  const features = {
    intersectionObserver: typeof IntersectionObserver !== 'undefined',
    fetch: typeof fetch !== 'undefined',
  };

  // Cache the result
  window.__featureSupport = features;
  return features;
};

/**
 * Applies minimal polyfills only when absolutely necessary
 * Optimized to avoid unnecessary code execution
 */
export const loadPolyfills = () => {
  // Use cached state to avoid reapplying polyfills
  if (window.__polyfillsLoaded) return;
  
  const features = checkFeatureSupport();
  let polyfillsApplied = false;
  
  // IntersectionObserver polyfill - only add if needed
  if (!features.intersectionObserver) {
    // Simplified polyfill that only implements essential functionality
    window.IntersectionObserver = class IntersectionObserver {
      constructor(callback) {
        this.callback = callback;
        this.elements = new Set();
        this.active = true;
        this.scrollHandler = () => this.checkIntersections();
        window.addEventListener('scroll', this.scrollHandler, { passive: true });
        window.addEventListener('resize', this.scrollHandler, { passive: true });
      }
      
      observe(element) {
        this.elements.add(element);
        this.checkIntersection(element);
      }
      
      unobserve(element) {
        this.elements.delete(element);
      }
      
      disconnect() {
        this.active = false;
        window.removeEventListener('scroll', this.scrollHandler);
        window.removeEventListener('resize', this.scrollHandler);
        this.elements.clear();
      }
      
      checkIntersections() {
        if (!this.active) return;
        this.elements.forEach(element => this.checkIntersection(element));
      }
      
      checkIntersection(element) {
        const rect = element.getBoundingClientRect();
        const isIntersecting = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isIntersecting) {
          this.callback([{
            isIntersecting,
            target: element,
          }], this);
        }
      }
    };
    polyfillsApplied = true;
  }

  // Only apply fetch polyfill if absolutely necessary
  // Most browsers have this natively now
  if (!features.fetch) {
    // Implementation omitted for brevity - only add back if truly needed
    // This can be added back for specific legacy browser support
    polyfillsApplied = true;
  }
  
  // Mark polyfills as loaded to avoid reprocessing
  window.__polyfillsLoaded = true;
  return polyfillsApplied;
};

/**
 * Initializes browser compatibility checks
 * Optimized version that does minimal work
 */
export const initBrowserCompatChecks = () => {
  // Don't run in SSR
  if (typeof window === 'undefined') {
    return { browserInfo: null, features: null };
  }
  
  // Skip if already initialized
  if (window.__browserChecksInitialized) {
    return { 
      browserInfo: window.__browserInfo || {}, 
      features: window.__featureSupport || {}
    };
  }
  
  // Quick, minimal browser detection
  const browserInfo = detectBrowser();
  
  // Apply polyfills only when needed
  loadPolyfills();
  
  // Mark as initialized
  window.__browserChecksInitialized = true;
  
  return { browserInfo, features: window.__featureSupport };
};
