// Browser Compatibility Utilities
// Helps detect and handle browser-specific issues

/**
 * Detects the current browser and returns information
 * @returns {Object} Browser information including name and version
 */
export const detectBrowser = () => {
  if (typeof window === 'undefined') {
    return { name: 'server', version: 'N/A', isCompatible: true };
  }

  const userAgent = window.navigator.userAgent;
  let browserName = 'Unknown';
  let browserVersion = 'Unknown';
  let isCompatible = true;
  
  // Chrome detection
  if (/Chrome/.test(userAgent) && !/Chromium|Edge|Edg|OPR|Opera/.test(userAgent)) {
    browserName = 'Chrome';
    browserVersion = userAgent.match(/Chrome\/(\d+\.\d+)/)?.[1] || 'Unknown';
    isCompatible = parseInt(browserVersion) >= 60;
  } 
  // Edge (Chromium-based) detection
  else if (/Edg/.test(userAgent)) {
    browserName = 'Edge';
    browserVersion = userAgent.match(/Edg\/(\d+\.\d+)/)?.[1] || 'Unknown';
    isCompatible = parseInt(browserVersion) >= 79;
  } 
  // Firefox detection
  else if (/Firefox/.test(userAgent)) {
    browserName = 'Firefox';
    browserVersion = userAgent.match(/Firefox\/(\d+\.\d+)/)?.[1] || 'Unknown';
    isCompatible = parseInt(browserVersion) >= 60;
  } 
  // Safari detection
  else if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) {
    browserName = 'Safari';
    browserVersion = userAgent.match(/Version\/(\d+\.\d+)/)?.[1] || 'Unknown';
    isCompatible = parseInt(browserVersion) >= 12;
  } 
  // IE detection (adding for completeness, but IE is not compatible)
  else if (/MSIE|Trident/.test(userAgent)) {
    browserName = 'Internet Explorer';
    browserVersion = userAgent.match(/(?:MSIE |rv:)(\d+\.\d+)/)?.[1] || 'Unknown';
    isCompatible = false; // IE is not supported
  }
  // Opera detection
  else if (/OPR|Opera/.test(userAgent)) {
    browserName = 'Opera';
    browserVersion = userAgent.match(/(?:OPR|Opera)\/(\d+\.\d+)/)?.[1] || 'Unknown';
    isCompatible = parseInt(browserVersion) >= 60;
  }

  return {
    name: browserName,
    version: browserVersion,
    isCompatible,
    userAgent
  };
};

/**
 * Checks if the current browser supports certain features
 * @returns {Object} Feature support status
 */
export const checkFeatureSupport = () => {
  if (typeof window === 'undefined') {
    return { allFeaturesSupported: true };
  }

  const features = {
    flexbox: typeof document.createElement('div').style.flexBasis !== 'undefined',
    grid: typeof document.createElement('div').style.grid !== 'undefined',
    es6: typeof Symbol !== 'undefined' && typeof Promise !== 'undefined',
    webp: false, // Will be detected asynchronously
    intersectionObserver: typeof IntersectionObserver !== 'undefined',
    fetch: typeof fetch !== 'undefined',
    webAnimations: typeof Element.prototype.animate !== 'undefined',
    webShare: typeof navigator.share !== 'undefined',
    serviceWorker: 'serviceWorker' in navigator
  };

  // Check WebP support
  const checkWebpSupport = () => {
    return new Promise(resolve => {
      const webpImg = new Image();
      webpImg.onload = () => {
        features.webp = true;
        resolve();
      };
      webpImg.onerror = () => {
        features.webp = false;
        resolve();
      };
      webpImg.src = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
    });
  };

  // For synchronous usage - all except webp
  features.allFeaturesSupported = Object.entries(features)
    .filter(([key]) => key !== 'webp' && key !== 'allFeaturesSupported')
    .every(([, value]) => value);

  return {
    ...features,
    checkWebpSupport
  };
};

/**
 * Shows a compatibility warning for outdated browsers - disabled as per client request
 */
export const showCompatibilityWarning = () => {
  // This function is intentionally disabled per client request
  return;
};

/**
 * Use feature detection to apply polyfills only when needed
 * Using simple inline polyfills to avoid external dependencies
 */
export const loadPolyfills = () => {
  const features = checkFeatureSupport();
  
  // Simple IntersectionObserver polyfill
  if (!features.intersectionObserver) {
    console.log('Adding basic IntersectionObserver polyfill');
    
    // Only provide minimal fallback functionality, not a complete polyfill
    window.IntersectionObserver = class IntersectionObserver {
      constructor(callback, options = {}) {
        this.callback = callback;
        this.options = options;
        this.elements = new Set();
        this.active = true;
        
        // Setup scroll listener as basic fallback
        this.scrollHandler = () => {
          if (!this.active) return;
          this.checkIntersections();
        };
        
        window.addEventListener('scroll', this.scrollHandler);
        window.addEventListener('resize', this.scrollHandler);
        
        // Initial check
        setTimeout(() => this.checkIntersections(), 100);
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
          const entry = {
            isIntersecting,
            intersectionRatio: 1,
            target: element,
            boundingClientRect: rect,
            intersectionRect: rect,
            rootBounds: {
              top: 0, left: 0, right: window.innerWidth, bottom: window.innerHeight,
              width: window.innerWidth, height: window.innerHeight
            }
          };
          
          this.callback([entry], this);
        }
      }
    };
  }

  // Simple fetch polyfill fallback using XMLHttpRequest
  if (!features.fetch) {
    console.log('Adding basic fetch API polyfill');
    
    window.fetch = (url, options = {}) => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        xhr.open(options.method || 'GET', url);
        
        if (options.headers) {
          Object.keys(options.headers).forEach(key => {
            xhr.setRequestHeader(key, options.headers[key]);
          });
        }
        
        xhr.onload = () => {
          const response = {
            status: xhr.status,
            statusText: xhr.statusText,
            headers: new Headers(xhr.getAllResponseHeaders().split('\r\n').reduce((acc, header) => {
              const [name, value] = header.split(': ');
              if (name) acc[name] = value;
              return acc;
            }, {})),
            url,
            text: () => Promise.resolve(xhr.responseText),
            json: () => Promise.resolve(JSON.parse(xhr.responseText)),
            blob: () => Promise.resolve(new Blob([xhr.response])),
            clone: () => response,
            ok: xhr.status >= 200 && xhr.status < 300
          };
          
          resolve(response);
        };
        
        xhr.onerror = () => {
          reject(new TypeError('Network request failed'));
        };
        
        xhr.ontimeout = () => {
          reject(new TypeError('Network request failed'));
        };
        
        xhr.send(options.body || null);
      });
    };
  }
};

/**
 * Initializes browser compatibility checks
 */
export const initBrowserCompatChecks = () => {
  const browserInfo = detectBrowser();
  const features = checkFeatureSupport();
  
  // Browser warning disabled per client request
  
  // Check WebP support asynchronously
  features.checkWebpSupport().then(() => {
    // Add a class to the document body for WebP support
    if (features.webp) {
      document.body.classList.add('webp-support');
    } else {
      document.body.classList.add('no-webp-support');
    }
  });
  
  // Load necessary polyfills
  loadPolyfills();
  
  return { browserInfo, features };
};
