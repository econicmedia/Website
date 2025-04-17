import React, { useState, useEffect } from 'react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  showOnMobileOnly?: boolean;
  className?: string;
}

/**
 * WhatsApp Button Component
 * A floating button that links to WhatsApp chat
 */
const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = '491761115432',
  message = 'Hallo BenFresh, ich interessiere mich für Ihre Reinigungsdienste.',
  size = 'md',
  showOnMobileOnly = false,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Size mappings
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
  };
  
  // Handle visibility based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 300px
      const shouldShow = window.scrollY > 300;
      setIsVisible(shouldShow);
    };
    
    // Add event listener
    window.addEventListener('scroll', handleScroll);
    
    // Trigger once on mount to set initial state
    handleScroll();
    
    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Generate WhatsApp link
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
  // Determine visibility classes
  const visibilityClasses = showOnMobileOnly 
    ? 'md:hidden' 
    : '';
  
  // Animation and transition classes
  const animationClasses = isVisible
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-10';
  
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Mit BenFresh via WhatsApp chatten"
      className={`
        fixed bottom-6 right-6 
        ${sizeClasses[size]} 
        flex items-center justify-center 
        bg-[#25D366] hover:bg-[#128C7E]
        rounded-full shadow-lg
        transition-all duration-300 ease-in-out
        ${animationClasses}
        ${visibilityClasses}
        ${className}
        z-40
        focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50
      `}
    >
      {/* WhatsApp Icon */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 175.216 175.552"
        className="w-1/2 h-1/2 fill-white"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M85.7,0.3C38.5,0.3,0,38.8,0,86c0,12.3,2.9,24.8,8.1,36.1L0.3,175.3 c-0.3,2.1,1.8,4.2,4,3.9l54.2-12.8c10.7,5,22.5,7.3,34.4,7.3c47.2,0,85.7-38.5,85.7-85.7S132.9,0.3,85.7,0.3z M135.9,119.2 c-3,8.1-17.3,16.5-23.9,17.5c-6.1,0.9-13.6,1.3-22-1.4c-12.7-4.1-22.5-9.3-32-20.3C47.8,103.5,41.7,91.2,42.5,78.1 c0.3-5.6,3-10.5,6.6-14.3c2.9-3.1,6.1-3.1,8.6-3.1c2.4,0,4.2,0,6.3,0.1c2,0,4.7-0.2,7.3,5.5c3.2,7,6.3,15,6.6,15.8 c0.8,1.6,1.3,3.4,0.2,5.5c-0.5,1-1,1.9-1.5,2.8c-0.8,1.2-1.7,2.7-2.4,3.6c-0.8,1-1.7,2.1-0.7,4.2c1,2,4.4,8.9,9.3,14.3 c6.4,7,11.6,9.5,13.5,10.5c1.5,0.8,3.3,0.6,4.5-0.6c1.5-1.5,3.5-4.1,5.4-6.6c1.3-1.7,3-2,4.8-1.3c1.8,0.6,11.7,5.4,13.7,6.4 c2,1,3.5,1.5,4,2.4C138.9,107.5,138.9,111.1,135.9,119.2z"/>
      </svg>
      
      {/* Accessibility text for screen readers only */}
      <span className="sr-only">Via WhatsApp kontaktieren</span>
    </a>
  );
};

export default WhatsAppButton;
