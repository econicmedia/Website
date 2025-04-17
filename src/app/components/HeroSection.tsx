"use client";
import React from "react";
import OptimizedImage from "../../components/OptimizedImage";

export const HeroSection: React.FC = () => (
  <section 
    className="w-full bg-white dark:bg-benfresh-dark-bg py-8 sm:py-12 lg:py-20 overflow-hidden relative" 
    aria-labelledby="hero-heading"
  >
    {/* Background pattern with enhanced lighting */}
    <div className="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none bg-repeat" 
      style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230097a7' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '100px 100px'
      }}
    ></div>
    
    {/* Enhanced ambient lighting effects */}
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-radial from-benfresh-tealLight to-transparent opacity-40 rounded-full transform -translate-x-1/2 translate-y-1/2 dark:from-benfresh-accent dark:opacity-10 blur-xl"></div>
    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-benfresh-tealLight to-transparent opacity-50 rounded-full transform translate-x-1/3 -translate-y-1/4 dark:from-benfresh-dark-teal dark:opacity-20 blur-xl"></div>
    <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-radial from-benfresh-tealLight/30 to-transparent opacity-30 rounded-full dark:from-benfresh-dark-teal/20 blur-3xl"></div>
    
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        {/* Left: Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col relative z-10">
          {/* Logo - Exact Match to Screenshot */}
          <div className="mb-6 sm:mb-12 self-start flex items-center gap-2 sm:gap-3" aria-hidden="true">
            <OptimizedImage 
              src="/images/logo.png" 
              alt="BenFresh Logo" 
              width={75} 
              height={75} 
              className="w-[50px] h-[50px] sm:w-[75px] sm:h-[75px]" 
              priority={true}
            />
            <div className="h-6 sm:h-8 w-px bg-benfresh-teal opacity-70 mx-1"></div>
            <span className="text-xl sm:text-3xl font-semibold text-benfresh-teal dark:text-benfresh-dark-teal tracking-wide">BenFresh Reinigung</span>
          </div>
          
          {/* Main Heading - with higher z-index to appear on top of any background elements */}
          <div className="relative z-10">
            <h1 
              id="hero-heading" 
              className="text-3xl xs:text-4xl sm:text-5xl lg:text-[4rem] font-extrabold text-benfresh-grayDark dark:text-white leading-tight mb-4 sm:mb-6 font-poppins tracking-tight"
            >
              Professionelle <span className="text-benfresh-teal dark:text-benfresh-dark-teal">Reinigung</span><br className="hidden sm:block" /> mit Qualitätsgarantie
            </h1>
          </div>
          
          {/* Subheading */}
          <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#555555] dark:text-benfresh-dark-textSecondary mb-4 sm:mb-6">
            Makellose Sauberkeit für Ihr Zuhause und Unternehmen in Köln & Umgebung
          </p>
          
          {/* Description */}
          <p className="text-base sm:text-lg lg:text-xl text-benfresh-grayDark dark:text-benfresh-dark-text mb-6 sm:mb-8 max-w-xl">
            Vertrauen Sie auf unser erfahrenes Team für pünktliche, zuverlässige und gründliche Reinigungsdienstleistungen – mit 100% Zufriedenheitsgarantie.
          </p>
          
          {/* Enhanced CTAs with ambient effects */}
          <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
            <a 
              href="#leistungen" 
              className="group inline-flex items-center justify-center bg-benfresh-teal text-white rounded-lg px-5 sm:px-7 py-3 sm:py-3.5 font-semibold text-sm sm:text-base shadow hover:bg-benfresh-tealDark hover:shadow-lg transition-all text-center relative overflow-hidden"
              aria-label="Zu unseren Leistungen springen"
            >
              {/* Button glow effect */}
              <div className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 group-hover:blur-md transition-all duration-300"></div>
              {/* Content on top of glow */}
              <div className="relative z-10 flex items-center">
                <span>Unsere Leistungen</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
            <a 
              href="#kontakt" 
              className="group inline-flex items-center justify-center bg-white text-benfresh-teal border border-benfresh-teal rounded-lg px-5 sm:px-7 py-3 sm:py-3.5 font-semibold text-sm sm:text-base shadow hover:bg-[#f0fafa] hover:shadow-lg transition-all text-center relative overflow-hidden"
              aria-label="Zum Kontaktformular springen"
            >
              {/* Button highlight effect */}
              <div className="absolute inset-0 w-full h-full bg-benfresh-tealLight opacity-0 group-hover:opacity-20 transition-all duration-300"></div>
              {/* Content on top of highlight */}
              <div className="relative z-10 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Kontakt aufnehmen</span>
              </div>
            </a>
          </div>
          
          {/* Enhanced Trust Indicators with hover effects */}
          <div className="flex flex-wrap gap-4 sm:gap-8 items-center" aria-label="Vertrauensindikatoren">
            <div className="flex items-center gap-3 group">
              <div className="flex items-center justify-center bg-benfresh-tealLight rounded-full p-2 sm:p-3 shadow-sm group-hover:shadow-md transition-all duration-300 relative overflow-hidden" aria-hidden="true">
                {/* Inner glow effect */}
                <div className="absolute inset-0 bg-gradient-radial from-white to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-7 sm:w-7 text-benfresh-teal relative z-10 transform group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm sm:text-lg font-medium text-benfresh-grayDark dark:text-white group-hover:text-benfresh-teal dark:group-hover:text-benfresh-dark-teal transition-colors duration-300">DSGVO-konform</span>
            </div>
            <div className="flex items-center gap-3 group">
              <div className="flex items-center justify-center bg-benfresh-tealLight rounded-full p-2 sm:p-3 shadow-sm group-hover:shadow-md transition-all duration-300 relative overflow-hidden" aria-hidden="true">
                {/* Inner glow effect */}
                <div className="absolute inset-0 bg-gradient-radial from-white to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-7 sm:w-7 text-benfresh-teal relative z-10 transform group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm sm:text-lg font-medium text-benfresh-grayDark dark:text-white group-hover:text-benfresh-teal dark:group-hover:text-benfresh-dark-teal transition-colors duration-300">Termingarantie</span>
            </div>
            <div className="flex items-center gap-3 group">
              <div className="flex items-center justify-center bg-benfresh-tealLight rounded-full p-2 sm:p-3 shadow-sm group-hover:shadow-md transition-all duration-300 relative overflow-hidden" aria-hidden="true">
                {/* Inner glow effect */}
                <div className="absolute inset-0 bg-gradient-radial from-white to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-7 sm:w-7 text-benfresh-teal relative z-10 transform group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-sm sm:text-lg font-medium text-benfresh-grayDark dark:text-white group-hover:text-benfresh-teal dark:group-hover:text-benfresh-dark-teal transition-colors duration-300">Versichert & geprüft</span>
            </div>
          </div>
        </div>
        
        {/* Right: Image with enhanced ambient lighting */}
        <div className="w-full lg:w-1/2 relative">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            {/* Ambient glow behind image */}
            <div className="absolute -inset-4 bg-gradient-radial from-benfresh-tealLight/50 to-transparent blur-xl opacity-70 dark:from-benfresh-dark-teal/30" aria-hidden="true"></div>
            
            {/* Main Image - using optimized component with proper loading strategies */}
            <OptimizedImage 
              src="/images/teamphoto.png" 
              alt="Das BenFresh Reinigungsteam - Professionelle Reinigungskräfte bereit für Ihren Einsatz" 
              width={800}
              height={600}
              className="w-full h-auto rounded-2xl aspect-[4/3] relative z-10"
              priority={true}
              quality={90}
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            
            {/* Image Overlay Badge removed as per client request */}
          </div>
          
          {/* Enhanced Decorative Elements with glow - hidden from screen readers */}
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-benfresh-tealLight rounded-full -z-10 blur-sm opacity-80 dark:opacity-40" aria-hidden="true"></div>
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-benfresh-tealLight rounded-full -z-10 blur-sm opacity-80 dark:opacity-40" aria-hidden="true"></div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
