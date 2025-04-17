"use client";
import React from "react";
import Link from "next/link";
import OptimizedImage from "../../components/OptimizedImage";

const FooterSection: React.FC = () => {
  return (
    <footer className="bg-[#2F2F2F] text-white relative overflow-hidden">
      {/* Ambient light effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#0097A7]/10 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0097A7]/10 rounded-full blur-3xl opacity-30"></div>
      
      {/* Main footer content */}
      <div className="container max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Logo and info */}
          <div className="space-y-4">
            <div className="flex items-center group">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center p-1 relative shadow-md group-hover:shadow-lg transition-all duration-300">
                {/* Logo glow effect on hover */}
                <div className="absolute inset-0 rounded-full bg-[#0097A7]/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"></div>
                <OptimizedImage 
                  src="/images/logo.png" 
                  alt="BenFresh Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10 relative z-10 transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="ml-3 text-xl font-bold text-white group-hover:text-[#0097A7] transition-colors duration-300">BenFresh</span>
            </div>
            
            <p className="text-gray-300 text-sm max-w-xs">
              Professionelle Reinigungsdienstleistungen für Privathaushalte und Unternehmen in Köln und Umgebung.
            </p>
            
            <div className="text-gray-300 text-sm space-y-1">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-[#0097A7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+491761115432" className="hover:text-[#0097A7] transition-colors">+49 176 1115432</a>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-[#0097A7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@benfresh.de" className="hover:text-[#0097A7] transition-colors">info@benfresh.de</a>
              </div>
            </div>
          </div>
          
          {/* Column 2: Services */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white relative inline-block">
              Leistungen
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-[#0097A7]"></span>
              {/* Subtle glow effect for heading underline */}
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-[#0097A7]/60 blur-sm"></span>
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/#leistungen" className="hover:text-[#0097A7] transition-colors inline-flex items-center group">
                  <svg className="w-3 h-3 mr-2 text-[#0097A7] transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Grundreinigung
                </Link>
              </li>
              <li>
                <Link href="/#leistungen" className="hover:text-[#0097A7] transition-colors inline-flex items-center">
                  <svg className="w-3 h-3 mr-2 text-[#0097A7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Fensterreinigung
                </Link>
              </li>
              <li>
                <Link href="/#leistungen" className="hover:text-[#0097A7] transition-colors inline-flex items-center">
                  <svg className="w-3 h-3 mr-2 text-[#0097A7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Büroreinigung
                </Link>
              </li>
              <li>
                <Link href="/#leistungen" className="hover:text-[#0097A7] transition-colors inline-flex items-center">
                  <svg className="w-3 h-3 mr-2 text-[#0097A7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Bauendreinigung
                </Link>
              </li>
              <li>
                <Link href="/#leistungen" className="hover:text-[#0097A7] transition-colors inline-flex items-center">
                  <svg className="w-3 h-3 mr-2 text-[#0097A7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Alle Leistungen ansehen
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white relative inline-block">
              Nützliche Links
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-[#0097A7]"></span>
              {/* Subtle glow effect for heading underline */}
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-[#0097A7]/60 blur-sm"></span>
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/#warum-benfresh" className="hover:text-[#0097A7] transition-colors inline-flex items-center">
                  <svg className="w-3 h-3 mr-2 text-[#0097A7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Warum BenFresh?
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-[#0097A7] transition-colors inline-flex items-center">
                  <svg className="w-3 h-3 mr-2 text-[#0097A7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Kontakt
                </Link>
              </li>
              <li>
                <a 
                  href="https://wa.me/491761115432?text=Hallo%20BenFresh%2C%20ich%20habe%20Interesse%20an%20einer%20Reinigung."
                  target="_blank"
                  rel="noopener"
                  className="hover:text-[#0097A7] transition-colors inline-flex items-center"
                >
                  <svg className="w-3 h-3 mr-2 text-[#0097A7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  WhatsApp Kontakt
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Legal */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white relative inline-block">
              Rechtliches
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-[#0097A7]"></span>
              {/* Subtle glow effect for heading underline */}
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-[#0097A7]/60 blur-sm"></span>
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/impressum" className="hover:text-[#0097A7] transition-colors inline-flex items-center">
                  <svg className="w-3 h-3 mr-2 text-[#0097A7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="hover:text-[#0097A7] transition-colors inline-flex items-center">
                  <svg className="w-3 h-3 mr-2 text-[#0097A7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link href="/agb" className="hover:text-[#0097A7] transition-colors inline-flex items-center">
                  <svg className="w-3 h-3 mr-2 text-[#0097A7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  AGB
                </Link>
              </li>
              <li>
                <Link href="/widerruf" className="hover:text-[#0097A7] transition-colors inline-flex items-center">
                  <svg className="w-3 h-3 mr-2 text-[#0097A7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Widerrufsrecht
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Enhanced Social media icons with ambient lighting */}
        <div className="mt-12 flex justify-center space-x-6">
          <a href="#" className="relative group">
            <div className="absolute inset-0 bg-[#0097A7] rounded-full opacity-0 group-hover:opacity-25 blur-md transition-opacity duration-300"></div>
            <div className="relative p-3 rounded-full group-hover:bg-[#0097A7]/10 transition-colors duration-300">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6 text-gray-400 group-hover:text-[#0097A7] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </div>
          </a>

          <a href="#" className="relative group">
            <div className="absolute inset-0 bg-[#0097A7] rounded-full opacity-0 group-hover:opacity-25 blur-md transition-opacity duration-300"></div>
            <div className="relative p-3 rounded-full group-hover:bg-[#0097A7]/10 transition-colors duration-300">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6 text-gray-400 group-hover:text-[#0097A7] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </div>
          </a>
        </div>
      </div>
      
      {/* Enhanced bottom bar with credits and subtle gradient */}
      <div className="bg-gradient-to-r from-[#1f1f1f] via-[#222222] to-[#1f1f1f] py-4 relative">
        <div className="absolute inset-0 bg-[#0097A7]/5 opacity-30"></div>
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 relative z-10">
          <p className="group">
            <span className="group-hover:text-[#0097A7]/80 transition-colors duration-300">&copy; {new Date().getFullYear()} BenFresh Reinigung.</span> Alle Rechte vorbehalten.
          </p>
          <p className="mt-2 md:mt-0">
            Designed by{" "}
            <a href="tel:+491723773552" className="text-[#0097A7] hover:text-[#0097A7]/80 hover:underline transition-all duration-300 relative group">
              <span className="relative z-10">Econic Media · +49 172 3773552</span>
              <span className="absolute inset-0 bg-[#0097A7]/10 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300"></span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
