"use client";
import React from "react";

const services = [
  {
    title: "Grundreinigung",
    description: "Gründliche Reinigung für ein rundum sauberes Zuhause oder Büro. Wir entfernen Staub, Schmutz und Flecken von allen Oberflächen.",
    icon: (
      <svg className="w-10 h-10 text-[#0097A7] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 21v-6a2 2 0 012-2h2a2 2 0 012 2v6"></path>
      </svg>
    ),
  },
  {
    title: "Fensterreinigung",
    description: "Streifenfreie Fenster mit professionellen Methoden. Wir reinigen Fenster aller Größen schnell und gründlich für beste Transparenz.",
    icon: (
      <svg className="w-10 h-10 text-[#0097A7] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 9h16M9 21V9"></path>
      </svg>
    ),
  },
  {
    title: "Teppichreinigung",
    description: "Tiefenreinigung für Teppiche und Polster. Wir entfernen Flecken, Gerüche und Allergene für ein frisches und hygienisches Raumklima.",
    icon: (
      <svg className="w-10 h-10 text-[#0097A7] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4l16 16M20 4L4 20"></path>
      </svg>
    ),
  },
  {
    title: "Bodenreinigung",
    description: "Professionelle Pflege für Hartböden, Fliesen, Laminat und mehr. Wir sorgen für glänzende, hygienisch saubere Oberflächen.",
    icon: (
      <svg className="w-10 h-10 text-[#0097A7] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4h16v16H4z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 12h16M12 4v16"></path>
      </svg>
    ),
  },
  {
    title: "Gemeinschaftsräume",
    description: "Zuverlässige Reinigung von Treppenhäusern, Fluren und Gemeinschaftsbereichen für Mehrfamilienhäuser und Wohnanlagen.",
    icon: (
      <svg className="w-10 h-10 text-[#0097A7] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
      </svg>
    ),
  },
  {
    title: "Büroreinigung",
    description: "Professionelle Reinigung von Büroflächen und Arbeitsplätzen für ein sauberes und produktives Arbeitsumfeld.",
    icon: (
      <svg className="w-10 h-10 text-[#0097A7] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
      </svg>
    ),
  },
  {
    title: "Entrümpelung",
    description: "Fachgerechte Entrümpelung von Wohnungen, Häusern und Geschäftsräumen. Wir entsorgen unerwünschte Gegenstände schnell und umweltgerecht.",
    icon: (
      <svg className="w-10 h-10 text-[#0097A7] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
      </svg>
    ),
  },
  {
    title: "Desinfektion",
    description: "Gründliche Desinfektion von Räumen und Oberflächen zur Bekämpfung von Keimen, Bakterien und Viren für maximale Hygiene und Sicherheit.",
    icon: (
      <svg className="w-10 h-10 text-[#0097A7] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
      </svg>
    ),
  },
  {
    title: "Bauendreinigung",
    description: "Professionelle Reinigung nach Bauarbeiten oder Renovierungen. Wir beseitigen Baustaub, Zementreste und Verschmutzungen für eine bezugsfertige Immobilie.",
    icon: (
      <svg className="w-10 h-10 text-[#0097A7] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7h18"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 5h4M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01"></path>
      </svg>
    ),
  },
  {
    title: "Hausmeisterservice",
    description: "Umfassende Hausmeisterdienste für Wohn- und Geschäftsgebäude. Von kleinen Reparaturen bis zur regelmäßigen Instandhaltung kümmern wir uns um alles.",
    icon: (
      <svg className="w-10 h-10 text-[#0097A7] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
      </svg>
    ),
  },
  {
    title: "Hotelsreinigung",
    description: "Spezialisierte Reinigung für Hotels und Gastgewerbe. Wir sorgen für makellose Zimmer, Lobbys und Gemeinschaftsbereiche gemäß höchster Hygienestandards.",
    icon: (
      <svg className="w-10 h-10 text-[#0097A7] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
      </svg>
    ),
  },
  {
    title: "Tatortreinigung",
    description: "Professionelle und diskrete Reinigung von besonderen Verschmutzungen. Spezialisiert auf die gründliche Beseitigung biologischer Spuren und komplexer Verschmutzungen.",
    icon: (
      <svg className="w-10 h-10 text-[#0097A7] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
      </svg>
    ),
  },
];

const ServicesSection: React.FC = () => (
  <section id="leistungen" className="w-full bg-white dark:bg-benfresh-dark-bg py-16 sm:py-20 lg:py-24 relative overflow-hidden">
    {/* Decorative Service-Related Background Elements */}
    <div className="absolute -top-20 -right-20 w-80 h-80 text-benfresh-tealLight dark:text-benfresh-dark-teal opacity-30 transform rotate-12">
      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.5 12c0-.23-.01-.45-.03-.68l1.86-1.41c.4-.3.51-.86.26-1.3l-1.87-3.23c-.25-.44-.79-.62-1.25-.42l-2.15.91c-.37-.26-.76-.49-1.17-.68l-.29-2.31c-.06-.5-.49-.88-.99-.88h-3.73c-.51 0-.94.38-1 .88l-.29 2.31c-.41.19-.8.42-1.17.68l-2.15-.91c-.46-.2-1 .02-1.25.42L2.41 8.62c-.25.44-.14.99.26 1.3l1.86 1.41c-.02.22-.03.44-.03.67s.01.45.03.68l-1.86 1.41c-.4.3-.51.86-.26 1.3l1.87 3.23c.25.44.79.62 1.25.42l2.15-.91c.37.26.76.49 1.17.68l.29 2.31c.06.5.49.88.99.88h3.73c.5 0 .93-.38.99-.88l.29-2.31c.41-.19.8-.42 1.17-.68l2.15.91c.46.2 1-.02 1.25-.42l1.87-3.23c.25-.44.14-.99-.26-1.3l-1.86-1.41c.03-.23.04-.45.04-.68zm-7.46 3.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
      </svg>
    </div>
    <div className="absolute bottom-10 -left-10 w-60 h-60 text-benfresh-tealLight dark:text-benfresh-dark-teal opacity-30 transform -rotate-12">
      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 16v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-5 0h-2v-2h2v2zm0-4h-2V8h2v4zm-1 10c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2z"/>
      </svg>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center justify-center px-4 py-1.5 bg-benfresh-tealLight dark:bg-benfresh-dark-teal dark:bg-opacity-20 rounded-full mb-4">
          <span className="text-sm font-medium text-benfresh-teal dark:text-benfresh-dark-teal">Unsere Dienstleistungen</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-benfresh-grayDark dark:text-white mb-4 font-poppins tracking-tight">
          Professionelle Reinigungslösungen für jeden Bedarf
        </h2>
        <div className="w-20 h-1.5 bg-benfresh-teal dark:bg-benfresh-dark-teal mx-auto mb-6 rounded-full"></div>
        <p className="text-lg text-benfresh-grayDark dark:text-benfresh-dark-text">
          Maßgeschneiderte Reinigungskonzepte für Privathaushalte und Unternehmen – zuverlässig, gründlich und flexibel.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {services.map((service) => (
          <div
            key={service.title}
            className="group bg-white dark:bg-benfresh-dark-card rounded-xl shadow-md p-6 hover:shadow-xl transition-all border border-[#F0F0F0] dark:border-benfresh-dark-surface hover:-translate-y-1 duration-300 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-benfresh-tealLight/20 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 dark:before:from-benfresh-dark-teal/10"
          >
            {/* Ambient light effect */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-benfresh-tealLight/30 dark:bg-benfresh-dark-teal/20 rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
            
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="bg-benfresh-tealLight dark:bg-benfresh-dark-teal dark:bg-opacity-20 rounded-full p-4 mb-5 group-hover:bg-benfresh-teal group-hover:text-white dark:group-hover:bg-benfresh-dark-teal transition-colors duration-300 shadow-md group-hover:shadow-lg">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-benfresh-grayDark dark:text-white mb-3">{service.title}</h3>
              <p className="text-base text-[#555555] dark:text-benfresh-dark-text leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* View All Button */}
      <div className="mt-12 text-center">
        <a 
          href="#kontakt" 
          className="inline-flex items-center justify-center bg-transparent text-benfresh-teal dark:text-benfresh-dark-teal font-semibold py-2 px-4 rounded-lg transition-all relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-benfresh-tealLight dark:bg-benfresh-dark-surface opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg"></div>
          <span className="relative z-10">Alle Leistungen anfragen</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 relative z-10 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  </section>
);

export default ServicesSection;
