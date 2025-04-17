"use client";
import React from "react";

const features = [
  {
    title: "Persönlicher Service",
    description: "Bei uns sind Sie keine Nummer. Wir nehmen uns Zeit für Ihre individuellen Wünsche und bieten maßgeschneiderte Lösungen statt Massenabfertigung.",
    icon: (
      <svg className="w-6 h-6 text-[#0097A7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "Pünktlich & zuverlässig",
    description: "Wir halten, was wir versprechen: Termine werden verlässlich eingehalten und alle Arbeiten diskret und professionell ausgeführt.",
    icon: (
      <svg className="w-6 h-6 text-[#0097A7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Faire Preise",
    description: "Transparente Preise ohne versteckte Kosten. Sie erhalten von uns detaillierte und nachvollziehbare Angebote ohne Überraschungen.",
    icon: (
      <svg className="w-6 h-6 text-[#0097A7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Langjährige Erfahrung",
    description: "Seit über 10 Jahren sind wir Experten für professionelle Reinigung. Wir kennen die besten Methoden für jeden Reinigungsbedarf.",
    icon: (
      <svg className="w-6 h-6 text-[#0097A7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: "Individuelle Lösungen",
    description: "Jede Immobilie ist anders. Wir passen unsere Reinigungskonzepte und Abläufe an Ihre spezifischen Anforderungen an.",
    icon: (
      <svg className="w-6 h-6 text-[#0097A7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "100% Zufriedenheit",
    description: "Mit unserer Zufriedenheitsgarantie gehen Sie kein Risiko ein. Sollten Sie nicht vollständig zufrieden sein, bessern wir kostenlos nach.",
    icon: (
      <svg className="w-6 h-6 text-[#0097A7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

const WhyBenfreshSection: React.FC = () => (
  <section id="warum-benfresh" className="w-full bg-[#F9F9F9] dark:bg-benfresh-dark-bg py-16 sm:py-20 lg:py-24 relative overflow-hidden">
    {/* Background decorative elements with enhanced lighting effect */}
    <div className="absolute inset-0 bg-gradient-dots opacity-20 pointer-events-none dark:opacity-5"></div>
    <div className="absolute top-0 right-0 w-96 h-96 bg-benfresh-tealLight/20 dark:bg-benfresh-dark-teal/10 rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-benfresh-tealLight/20 dark:bg-benfresh-dark-teal/10 rounded-full blur-3xl"></div>
    
    {/* Quality & Trust related decorative elements */}
    <div className="absolute top-40 -right-10 w-72 h-72 text-benfresh-teal opacity-30 transform rotate-6">
      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
      </svg>
    </div>
    
    <div className="absolute bottom-20 -left-16 w-80 h-80 text-benfresh-teal opacity-30 transform -rotate-12">
      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/>
      </svg>
    </div>
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center justify-center px-4 py-1.5 bg-benfresh-tealLight dark:bg-benfresh-dark-teal dark:bg-opacity-20 rounded-full mb-4">
          <span className="text-sm font-medium text-benfresh-teal dark:text-benfresh-dark-teal">Warum uns wählen</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-benfresh-grayDark dark:text-white mb-4 font-poppins tracking-tight">
          Das macht BenFresh besonders
        </h2>
        <div className="w-20 h-1.5 bg-benfresh-teal dark:bg-benfresh-dark-teal mx-auto mb-6 rounded-full"></div>
        <p className="text-lg text-benfresh-grayDark dark:text-benfresh-dark-text">
          Wir setzen auf Qualität, Zuverlässigkeit und persönlichen Service – für ein sauberes Gefühl in Ihrem Zuhause oder Betrieb.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
        {features.map((feature) => (
          <div 
            key={feature.title}
            className="group bg-white dark:bg-benfresh-dark-card rounded-xl shadow-md p-6 hover:shadow-xl transition-all border-l-4 border-l-benfresh-teal dark:border-l-benfresh-dark-teal border border-[#F0F0F0] dark:border-benfresh-dark-surface hover:-translate-y-1 duration-300 relative overflow-hidden"
          >
            {/* Ambient light effect */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-benfresh-tealLight/30 dark:bg-benfresh-dark-teal/20 rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
            
            <div className="flex items-start gap-4 relative z-10">
              <div className="bg-benfresh-tealLight dark:bg-benfresh-dark-teal dark:bg-opacity-20 rounded-full p-3 flex-shrink-0 shadow-sm group-hover:shadow-md transition-all duration-300">
                <div className="text-benfresh-teal dark:text-benfresh-dark-teal group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-benfresh-grayDark dark:text-white mb-2 group-hover:text-benfresh-teal dark:group-hover:text-benfresh-dark-teal transition-colors duration-300">{feature.title}</h3>
                <p className="text-base text-[#555555] dark:text-benfresh-dark-text leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Testimonial Section with enhanced styling */}
      <div className="bg-white dark:bg-benfresh-dark-card rounded-xl shadow-lg p-8 border border-[#F0F0F0] dark:border-benfresh-dark-surface relative overflow-hidden">
        {/* Subtle ambient background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-benfresh-tealLight/10 to-transparent dark:from-benfresh-dark-teal/5"></div>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/3 text-center md:text-left">
            <h3 className="text-2xl font-bold text-benfresh-grayDark dark:text-white mb-4">Das sagen unsere Kunden</h3>
            <div className="flex items-center justify-center md:justify-start mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
            </div>
            <p className="text-lg text-[#555555] dark:text-benfresh-dark-text italic">Über 200 zufriedene Kunden vertrauen auf unsere Reinigungsdienstleistungen.</p>
          </div>
          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <blockquote className="group bg-[#F9F9F9] dark:bg-benfresh-dark-surface p-5 rounded-lg border-l-4 border-l-benfresh-teal dark:border-l-benfresh-dark-teal shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
                {/* Quote icon with ambient effect */}
                <div className="absolute -right-4 -top-4 text-benfresh-tealLight/30 dark:text-benfresh-dark-teal/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 transform rotate-180" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144C8.97 4.222 8.737 4.278 8.472 4.345c-.271.05-.56.187-.882.312C7.272 4.799 6.904 4.895 6.562 5.123c-.344.218-.741.4-1.091.692C5.132 6.116 4.723 6.377 4.421 6.76c-.33.358-.656.734-.909 1.162C3.219 8.33 3.02 8.778 2.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C2.535 17.474 4.338 19 6.5 19c2.485 0 4.5-2.015 4.5-4.5S8.985 10 6.5 10zM17.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L20.758 4.03c0 0-.218.052-.597.144-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.944-.33.358-.656.734-.909 1.162C14.219 8.33 14.02 8.778 13.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C13.535 17.474 15.338 19 17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10z" />
                  </svg>
                </div>
                
                <div className="relative z-10">
                  <p className="text-[#555555] dark:text-benfresh-dark-text mb-4">&ldquo;BenFresh reinigt unsere Büros seit über 2 Jahren. Absolut zuverlässig und gründlich – wir sind sehr zufrieden!&rdquo;</p>
                  <footer className="font-medium text-benfresh-grayDark dark:text-white flex items-center gap-2">
                    <span className="inline-block w-6 h-0.5 bg-benfresh-teal dark:bg-benfresh-dark-teal"></span>
                    Markus K., Köln-Ehrenfeld
                  </footer>
                </div>
              </blockquote>
              
              <blockquote className="group bg-[#F9F9F9] dark:bg-benfresh-dark-surface p-5 rounded-lg border-l-4 border-l-benfresh-teal dark:border-l-benfresh-dark-teal shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
                {/* Quote icon with ambient effect */}
                <div className="absolute -right-4 -top-4 text-benfresh-tealLight/30 dark:text-benfresh-dark-teal/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 transform rotate-180" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144C8.97 4.222 8.737 4.278 8.472 4.345c-.271.05-.56.187-.882.312C7.272 4.799 6.904 4.895 6.562 5.123c-.344.218-.741.4-1.091.692C5.132 6.116 4.723 6.377 4.421 6.76c-.33.358-.656.734-.909 1.162C3.219 8.33 3.02 8.778 2.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C2.535 17.474 4.338 19 6.5 19c2.485 0 4.5-2.015 4.5-4.5S8.985 10 6.5 10zM17.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L20.758 4.03c0 0-.218.052-.597.144-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.944-.33.358-.656.734-.909 1.162C14.219 8.33 14.02 8.778 13.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C13.535 17.474 15.338 19 17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10z" />
                  </svg>
                </div>
                
                <div className="relative z-10">
                  <p className="text-[#555555] dark:text-benfresh-dark-text mb-4">&ldquo;Pünktlich, freundlich und die Räume strahlen nach der Reinigung. Kann BenFresh nur weiterempfehlen!&rdquo;</p>
                  <footer className="font-medium text-benfresh-grayDark dark:text-white flex items-center gap-2">
                    <span className="inline-block w-6 h-0.5 bg-benfresh-teal dark:bg-benfresh-dark-teal"></span>
                    Sabine M., Köln-Sülz
                  </footer>
                </div>
              </blockquote>
            </div>
            
            {/* Additional reviews */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <blockquote className="group bg-[#F9F9F9] dark:bg-benfresh-dark-surface p-5 rounded-lg border-l-4 border-l-benfresh-teal dark:border-l-benfresh-dark-teal shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
                <div className="absolute -right-4 -top-4 text-benfresh-tealLight/30 dark:text-benfresh-dark-teal/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 transform rotate-180" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144C8.97 4.222 8.737 4.278 8.472 4.345c-.271.05-.56.187-.882.312C7.272 4.799 6.904 4.895 6.562 5.123c-.344.218-.741.4-1.091.692C5.132 6.116 4.723 6.377 4.421 6.76c-.33.358-.656.734-.909 1.162C3.219 8.33 3.02 8.778 2.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C2.535 17.474 4.338 19 6.5 19c2.485 0 4.5-2.015 4.5-4.5S8.985 10 6.5 10zM17.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L20.758 4.03c0 0-.218.052-.597.144-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.944-.33.358-.656.734-.909 1.162C14.219 8.33 14.02 8.778 13.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C13.535 17.474 15.338 19 17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10z" />
                  </svg>
                </div>
                
                <div className="relative z-10">
                  <p className="text-[#555555] dark:text-benfresh-dark-text mb-4">&ldquo;Wir beauftragen BenFresh regelmäßig für die Grundreinigung unserer Ferienwohnung. Die Qualität ist erstklassig und der Service immer zuverlässig.&rdquo;</p>
                  <footer className="font-medium text-benfresh-grayDark dark:text-white flex items-center gap-2">
                    <span className="inline-block w-6 h-0.5 bg-benfresh-teal dark:bg-benfresh-dark-teal"></span>
                    Thomas B., Köln-Lindenthal
                  </footer>
                </div>
              </blockquote>
              
              <blockquote className="group bg-[#F9F9F9] dark:bg-benfresh-dark-surface p-5 rounded-lg border-l-4 border-l-benfresh-teal dark:border-l-benfresh-dark-teal shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
                <div className="absolute -right-4 -top-4 text-benfresh-tealLight/30 dark:text-benfresh-dark-teal/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 transform rotate-180" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144C8.97 4.222 8.737 4.278 8.472 4.345c-.271.05-.56.187-.882.312C7.272 4.799 6.904 4.895 6.562 5.123c-.344.218-.741.4-1.091.692C5.132 6.116 4.723 6.377 4.421 6.76c-.33.358-.656.734-.909 1.162C3.219 8.33 3.02 8.778 2.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C2.535 17.474 4.338 19 6.5 19c2.485 0 4.5-2.015 4.5-4.5S8.985 10 6.5 10zM17.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L20.758 4.03c0 0-.218.052-.597.144-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.944-.33.358-.656.734-.909 1.162C14.219 8.33 14.02 8.778 13.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C13.535 17.474 15.338 19 17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10z" />
                  </svg>
                </div>
                
                <div className="relative z-10">
                  <p className="text-[#555555] dark:text-benfresh-dark-text mb-4">&ldquo;Die Fensterreinigung war perfekt! Endlich wieder klare Sicht ohne Schlieren. Das Team war sehr freundlich und professionell. Gerne wieder!&rdquo;</p>
                  <footer className="font-medium text-benfresh-grayDark dark:text-white flex items-center gap-2">
                    <span className="inline-block w-6 h-0.5 bg-benfresh-teal dark:bg-benfresh-dark-teal"></span>
                    Laura K., Köln-Deutz
                  </footer>
                </div>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default WhyBenfreshSection;
