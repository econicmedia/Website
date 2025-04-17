"use client";

import { useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import CookieBanner from "./CookieBanner";
import { initAccessibilityChecker } from "../utils/accessibilityChecker";
import { initMonitoring, trackPageView } from "../utils/monitoringSystem";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  // Initialize systems in client-side code
  useEffect(() => {
    // Initialize accessibility checker in development mode
    if (process.env.NODE_ENV === 'development') {
      initAccessibilityChecker();
    }
    
    // Initialize monitoring system
    initMonitoring({
      debug: process.env.NODE_ENV === 'development',
      endpoint: '/api/monitoring'
    });
    
    // Track page view on initial load and on route changes
    const handleRouteChange = (url: string) => {
      trackPageView(url);
    };
    
    // Track initial page view
    trackPageView(window.location.pathname);
    
    // Listen for route changes in Next.js
    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', () => {
        handleRouteChange(window.location.pathname);
      });
    }
    
    return () => {
      // Cleanup event listeners
      if (typeof window !== 'undefined') {
        window.removeEventListener('popstate', () => {
          handleRouteChange(window.location.pathname);
        });
      }
    };
  }, []);

  return (
    <>
      {children}
      <ThemeToggle />
      <CookieBanner />
    </>
  );
}
