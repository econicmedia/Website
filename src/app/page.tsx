"use client";

import React, { useEffect, useState, useCallback, memo } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { initBrowserCompatChecks } from "../utils/browserCompat";
import HeroSection from "./components/HeroSection";

// Lazy load non-critical components to improve initial page load
const ServicesSection = dynamic(() => import("./components/ServicesSection"), {
  ssr: true,
  loading: () => <div className="h-96" /> // Placeholder to prevent layout shift
});

const WhyBenfreshSection = dynamic(() => import("./components/WhyBenfreshSection"), {
  ssr: true
});

const ContactSection = dynamic(() => import("./components/ContactSection"), {
  ssr: true
});

const FooterSection = dynamic(() => import("./components/FooterSection"), {
  ssr: true
});

// Memoized Back to Top Button to prevent unnecessary re-renders
const BackToTopButton = memo(() => {
  // Use useCallback for event handlers to prevent unnecessary re-renders
  const [isVisible, setIsVisible] = useState(false);
  
  // Throttled scroll handler for better performance
  const handleScroll = useCallback(() => {
    // Only update state when visibility actually changes
    const shouldBeVisible = window.scrollY > 600;
    if (shouldBeVisible !== isVisible) {
      setIsVisible(shouldBeVisible);
    }
  }, [isVisible]);

  useEffect(() => {
    // Use passive listener to improve scrolling performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check initial visibility
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
  
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
  
  // Only render and animate the button when needed
  return (
    <button
      className={`fixed bottom-6 left-6 p-3 bg-benfresh-teal text-white rounded-full shadow-lg transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-benfresh-teal ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      aria-label="Zurück zum Seitenanfang"
      onClick={scrollToTop}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 11l7-7 7 7M5 19l7-7 7 7"
        />
      </svg>
    </button>
  );
});

BackToTopButton.displayName = 'BackToTopButton';

export default function Home() {
  // Initialize browser compatibility checks once without affecting rendering
  useEffect(() => {
    // Use requestIdleCallback to run non-critical init during idle time
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        initBrowserCompatChecks();
      }, { timeout: 1000 });
    } else {
      // Fallback for browsers that don't support requestIdleCallback
      setTimeout(() => {
        initBrowserCompatChecks();
      }, 200);
    }
  }, []);

  return (
    <>
      <Head>
        {/* This Head component will be combined with metadata from layout.tsx */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      {/* Main Content - Remove nested animation divs to improve performance */}
      <div className="flex flex-col min-h-screen">
        {/* Critical path - load immediately */}
        <HeroSection />
        
        {/* Non-critical sections with lazy loading */}
        <ServicesSection />
        <WhyBenfreshSection />
        <ContactSection />
        <FooterSection />
      </div>
      
      {/* Back to top button - memoized to prevent unnecessary re-renders */}
      <BackToTopButton />
    </>
  );
}
