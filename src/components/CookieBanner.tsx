"use client";

import { useState, useEffect, useCallback, memo } from 'react';
import Link from 'next/link';

// Define cookie preference types
type CookieConsent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  acceptedAt?: string;
};

// Default consent values
const defaultConsent: CookieConsent = {
  necessary: true, // Always required/true
  analytics: false,
  marketing: false,
};

// Memoized cookie banner component for better performance
export default memo(function CookieBanner() {
  // Combine related state to reduce re-renders
  const [state, setState] = useState({
    consent: defaultConsent,
    showBanner: false,
    showPreferences: false,
    isInitialized: false
  });
  
  // Destructure for readability
  const { consent, showBanner, showPreferences, isInitialized } = state;

  // Load consent settings asynchronously on mount
  useEffect(() => {
    // Use requestIdleCallback for non-critical operation
    const loadConsent = () => {
      try {
        const storedConsent = localStorage.getItem('cookie-consent');
        if (storedConsent) {
          try {
            const parsedConsent = JSON.parse(storedConsent);
            
            setState(prev => ({
              ...prev,
              consent: parsedConsent,
              showBanner: !parsedConsent.acceptedAt,
              isInitialized: true
            }));
          } catch (e) {
            // If parsing fails, show the banner
            setState(prev => ({
              ...prev,
              showBanner: true,
              isInitialized: true
            }));
          }
        } else {
          // No consent stored, show the banner
          setState(prev => ({
            ...prev,
            showBanner: true,
            isInitialized: true
          }));
        }
      } catch (e) {
        // Error accessing localStorage, assume browser consent
        setState(prev => ({
          ...prev,
          isInitialized: true
        }));
      }
    };
    
    // Run initial state setup during idle time
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(loadConsent, { timeout: 1000 });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(loadConsent, 100);
    }
  }, []);

  // Memoized handlers to prevent unnecessary re-renders
  const saveConsent = useCallback((newConsent: CookieConsent) => {
    newConsent.acceptedAt = new Date().toISOString();
    
    // Use try-catch to handle potential localStorage errors
    try {
      localStorage.setItem('cookie-consent', JSON.stringify(newConsent));
    } catch (e) {
      // Silent fail - user can still use site without consent storage
    }
    
    // Use functional update to ensure we always have the latest state
    setState(prev => ({
      ...prev,
      consent: newConsent,
      showBanner: false,
      showPreferences: false
    }));
    
    // Dispatch storage event to notify other tabs about consent change
    window.dispatchEvent(new Event('storage'));
  }, []);

  // Handle accepting all cookies - memoized
  const acceptAll = useCallback(() => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  }, [saveConsent]);

  // Handle rejecting optional cookies - memoized
  const rejectOptional = useCallback(() => {
    saveConsent({
      ...defaultConsent,
    });
  }, [saveConsent]);

  // Handle saving custom preferences - memoized
  const savePreferences = useCallback(() => {
    saveConsent({
      ...consent,
    });
  }, [consent, saveConsent]);

  // Toggle individual cookie types - memoized
  const toggleCookieType = useCallback((type: 'analytics' | 'marketing') => {
    setState(prev => ({
      ...prev,
      consent: {
        ...prev.consent,
        [type]: !prev.consent[type],
      }
    }));
  }, []);
  
  // Open preferences panel - memoized
  const openPreferences = useCallback(() => {
    setState(prev => ({
      ...prev,
      showPreferences: true
    }));
  }, []);

  // Don't render anything until initialization is complete
  if (!isInitialized || (!showBanner && !showPreferences)) return null;

  // Optimized rendering with fewer conditionals
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {showBanner && !showPreferences ? (
        <div className="bg-white dark:bg-benfresh-dark-card shadow-lg border-t border-gray-200 dark:border-benfresh-dark-surface p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-benfresh-grayDark dark:text-white mb-2">
                  Wir verwenden Cookies
                </h3>
                <p className="text-sm text-gray-600 dark:text-benfresh-dark-text mb-2">
                  Diese Website verwendet Cookies, um Ihre Erfahrung zu verbessern. Einige Cookies sind 
                  notwendig für den Betrieb der Website, während andere uns helfen, zu verstehen, wie Sie 
                  mit der Website interagieren.
                </p>
                <div className="text-sm text-gray-500 dark:text-benfresh-dark-textSecondary">
                  <span>
                    Weitere Informationen finden Sie in unserer{' '}
                    <Link
                      href="/datenschutz"
                      className="text-benfresh-teal dark:text-benfresh-dark-teal underline"
                      target="_blank" 
                      rel="noopener"
                    >
                      Datenschutzerklärung
                    </Link>
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <button
                  onClick={openPreferences}
                  className="text-sm px-4 py-2 rounded-lg border border-gray-300 dark:border-benfresh-dark-surface bg-white dark:bg-benfresh-dark-card text-benfresh-grayDark dark:text-white hover:bg-gray-50 dark:hover:bg-benfresh-dark-surface transition-colors"
                >
                  Einstellungen
                </button>
                <button
                  onClick={rejectOptional}
                  className="text-sm px-4 py-2 rounded-lg border border-benfresh-teal dark:border-benfresh-dark-teal bg-white dark:bg-benfresh-dark-card text-benfresh-teal dark:text-benfresh-dark-teal hover:bg-benfresh-tealLight dark:hover:bg-benfresh-dark-teal dark:hover:bg-opacity-10 transition-colors"
                >
                  Nur Notwendige
                </button>
                <button
                  onClick={acceptAll}
                  className="text-sm px-4 py-2 rounded-lg bg-benfresh-teal dark:bg-benfresh-dark-teal text-white font-medium hover:bg-benfresh-tealDark dark:hover:bg-benfresh-dark-tealDark transition-colors"
                >
                  Alle akzeptieren
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : showPreferences ? (
        <div className="bg-white dark:bg-benfresh-dark-card shadow-lg border-t border-gray-200 dark:border-benfresh-dark-surface p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-xl font-semibold text-benfresh-grayDark dark:text-white mb-4">
              Cookie-Einstellungen
            </h3>
            
            <div className="space-y-4 mb-6">
              {/* Necessary Cookies */}
              <div className="border border-gray-200 dark:border-benfresh-dark-surface rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-benfresh-grayDark dark:text-white">Notwendige Cookies</h4>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      disabled
                      checked={true}
                      className="h-5 w-10 rounded-full appearance-none bg-gray-300 dark:bg-benfresh-dark-surface checked:bg-benfresh-teal dark:checked:bg-benfresh-dark-teal transition-colors duration-200 cursor-pointer"
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-benfresh-dark-text">
                  Diese Cookies sind für die grundlegende Funktionalität der Website erforderlich und können nicht deaktiviert werden.
                </p>
              </div>
              
              {/* Analytics Cookies */}
              <div className="border border-gray-200 dark:border-benfresh-dark-surface rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-benfresh-grayDark dark:text-white">Analyse-Cookies</h4>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={consent.analytics}
                      onChange={() => toggleCookieType('analytics')}
                      className="sr-only"
                      id="analytics-toggle"
                    />
                    <label
                      htmlFor="analytics-toggle"
                      className={`block h-5 w-10 rounded-full ${
                        consent.analytics ? 'bg-benfresh-teal dark:bg-benfresh-dark-teal' : 'bg-gray-300 dark:bg-benfresh-dark-surface'
                      } transition-colors duration-200 cursor-pointer relative`}
                    >
                      <span
                        className={`absolute left-0.5 top-0.5 bg-white h-4 w-4 rounded-full transition-transform duration-200 transform ${
                          consent.analytics ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </label>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-benfresh-dark-text">
                  Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren, 
                  indem sie anonymisierte Nutzungsdaten sammeln.
                </p>
              </div>
              
              {/* Marketing Cookies */}
              <div className="border border-gray-200 dark:border-benfresh-dark-surface rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-benfresh-grayDark dark:text-white">Marketing-Cookies</h4>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={consent.marketing}
                      onChange={() => toggleCookieType('marketing')}
                      className="sr-only"
                      id="marketing-toggle"
                    />
                    <label
                      htmlFor="marketing-toggle"
                      className={`block h-5 w-10 rounded-full ${
                        consent.marketing ? 'bg-benfresh-teal dark:bg-benfresh-dark-teal' : 'bg-gray-300 dark:bg-benfresh-dark-surface'
                      } transition-colors duration-200 cursor-pointer relative`}
                    >
                      <span
                        className={`absolute left-0.5 top-0.5 bg-white h-4 w-4 rounded-full transition-transform duration-200 transform ${
                          consent.marketing ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </label>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-benfresh-dark-text">
                  Diese Cookies werden verwendet, um Ihnen relevante Werbung auf unserer Website und auf anderen Plattformen anzuzeigen.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 justify-end">
              <button
                onClick={rejectOptional}
                className="text-sm px-4 py-2 rounded-lg border border-gray-300 dark:border-benfresh-dark-surface bg-white dark:bg-benfresh-dark-card text-benfresh-grayDark dark:text-white hover:bg-gray-50 dark:hover:bg-benfresh-dark-surface transition-colors"
              >
                Alle ablehnen
              </button>
              <button
                onClick={acceptAll}
                className="text-sm px-4 py-2 rounded-lg border border-benfresh-teal dark:border-benfresh-dark-teal bg-white dark:bg-benfresh-dark-card text-benfresh-teal dark:text-benfresh-dark-teal hover:bg-benfresh-tealLight dark:hover:bg-benfresh-dark-teal dark:hover:bg-opacity-10 transition-colors"
              >
                Alle akzeptieren
              </button>
              <button
                onClick={savePreferences}
                className="text-sm px-4 py-2 rounded-lg bg-benfresh-teal dark:bg-benfresh-dark-teal text-white font-medium hover:bg-benfresh-tealDark dark:hover:bg-benfresh-dark-tealDark transition-colors"
              >
                Auswahl speichern
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
});
