"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import { initBrowserCompatChecks } from "../utils/browserCompat";
import { logBreakpoint } from "../utils/responsiveTester";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import WhyBenfreshSection from "./components/WhyBenfreshSection";
import ContactSection from "./components/ContactSection";
import FooterSection from "./components/FooterSection";

// Back to Top Button component
const BackToTopButton = () => {
  // Always start with isVisible=false for SSR compatibility
  const [isVisible, setIsVisible] = useState(false);
  // Use this to prevent executing client-side code during server render
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Mark as mounted on client
    setIsMounted(true);
    
    const scrollThreshold = 600;
    
    function toggleVisibility() {
      setIsVisible(window.scrollY > scrollThreshold);
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', toggleVisibility);
    
    // Check initial visibility
    toggleVisibility();
    
    // Clean up
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  const scrollToTop = () => {
    if (isMounted) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };
  
  // Always render the button, but control visibility with CSS
  // This ensures server and client render the same HTML
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
};

export default function Home() {
  // State to control section visibility
  const [contentVisible, setContentVisible] = useState(false);

  // Initialize browser compatibility checks and handle animations
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Log current device/screen size for debugging
      logBreakpoint();
      
      // Initialize browser compatibility checks
      initBrowserCompatChecks();
      
      // Show all content after hydration
      setTimeout(() => {
        setContentVisible(true);
      }, 10);
      
      // Clean up function
      return () => {};
    }
  }, []);

  // Handle page visibility changes and navigation for content fix
  useEffect(() => {
    function handleVisibilityChange() {
      if (document.visibilityState === 'visible') {
        // When tab becomes visible again (like after navigation)
        setContentVisible(true);
      }
    }

    // Handle popstate events for browser back/forward navigation
    function handlePopState() {
      // Ensure content is visible when navigating with browser back button
      setContentVisible(true);
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <>
      <Head>
        {/* This Head component will be combined with metadata from layout.tsx */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      {/* Main Content */}
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <div 
          className={`transition-opacity duration-500 ${contentVisible ? 'opacity-100' : 'opacity-0'}`} 
          style={{ transitionDelay: "0.1s" }}
        >
          <HeroSection />
        </div>
        
        {/* Services Section */}
        <div 
          className={`transition-opacity duration-500 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: "0.2s" }}
        >
          <ServicesSection />
        </div>
        
        {/* Why BenFresh Section */}
        <div 
          className={`transition-opacity duration-500 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: "0.3s" }}
        >
          <WhyBenfreshSection />
        </div>
        
        {/* Contact Section */}
        <div 
          className={`transition-opacity duration-500 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: "0.4s" }}
        >
          <ContactSection />
        </div>
        
        {/* Footer */}
        <div 
          className={`transition-opacity duration-500 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: "0.5s" }}
        >
          <FooterSection />
        </div>
      </div>
      
      {/* WhatsApp Button temporarily disabled */}
      
      {/* Skip to top button - shows after scrolling */}
      <div id="back-to-top-container">
        <BackToTopButton />
      </div>
    </>
  );
}
