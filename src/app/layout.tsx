import { Poppins, Open_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ClientLayout from "../components/ClientLayout";
import { metadata, viewport, localBusinessSchema } from "./metadata";

// Optimize font loading
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap", // Ensure text remains visible during font loading
  preload: true,
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
  preload: true,
});

// Re-export metadata and viewport from the metadata file
export { metadata, viewport };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        {/* Dark mode script - Prevents flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Immediately check and apply the theme before any rendering
                function setInitialTheme() {
                  function getThemePreference() {
                    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
                      return localStorage.getItem('theme');
                    }
                    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  
                  const theme = getThemePreference();
                  
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                  
                  // Also set a data attribute for potential CSS targeting
                  document.documentElement.setAttribute('data-theme', theme);
                }
                
                // Try-catch to handle any potential issues
                try {
                  setInitialTheme();
                } catch (e) {
                  console.error('Error setting initial theme:', e);
                }
              })();
            `,
          }}
        />
        
        {/* Add structured data with JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Add favicons for various devices */}
        <link rel="icon" href="/images/logo.png" sizes="any" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/logo.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${poppins.variable} ${openSans.variable} antialiased text-benfresh-grayDark`}
      >
        {/* Skip to content link for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-benfresh-teal"
        >
          Zum Hauptinhalt springen
        </a>
        
        <ClientLayout>
          <main id="main-content">
            {children}
          </main>
        </ClientLayout>
        
        {/* Conditional Analytics Script - Loads only with consent */}
        <Script
          id="analytics-consent-check"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function loadAnalytics() {
                // Check for cookie consent
                try {
                  const consent = JSON.parse(localStorage.getItem('cookie-consent') || '{}');
                  if (consent.analytics) {
                    // Load analytics only if user has consented
                    const gtagScript = document.createElement('script');
                    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-MEASUREMENT_ID'; // Replace with actual ID
                    gtagScript.async = true;
                    document.head.appendChild(gtagScript);
                    
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-MEASUREMENT_ID'); // Replace with actual ID
                    
                    console.log('Analytics loaded with consent');
                  }
                } catch (e) {
                  console.error('Error checking analytics consent:', e);
                }
              }
              
              // Load analytics on page load
              loadAnalytics();
              
              // Listen for consent changes
              window.addEventListener('storage', function(e) {
                if (e.key === 'cookie-consent') {
                  loadAnalytics();
                }
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
