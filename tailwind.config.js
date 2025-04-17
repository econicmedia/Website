/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary colors
        benfresh: {
          white: "#FFFFFF",
          teal: "#0097A7",
          tealDark: "#007C8B",
          tealLight: "#E0F7FA",
          grayDark: "#2F2F2F",
          grayLight: "#F3F4F6",
          warning: "#F44336",
          // Dark mode colors
          dark: {
            bg: "#121212",
            surface: "#1E1E1E",
            card: "#252525",
            teal: "#00BCD4",
            tealLight: "#0097A7",
            tealDark: "#007C8B",
            text: "#E0E0E0",
            textSecondary: "#AAAAAA",
          },
          // Additional creative colors
          accent: "#9C27B0", // Purple accent for creative elements
          accent2: "#FF5722", // Orange accent for highlights
          accent3: "#4CAF50", // Green accent for tertiary elements
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-dots': 'repeating-radial-gradient(rgba(0,151,167,0.2) 2px, transparent 5px, transparent 100px)',
        'waves': 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1440 320\'%3E%3Cpath fill=\'%230097a7\' fill-opacity=\'0.1\' d=\'M0,160L48,144C96,128,192,96,288,101.3C384,107,480,149,576,181.3C672,213,768,235,864,213.3C960,192,1056,128,1152,117.3C1248,107,1344,149,1392,170.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z\'%3E%3C/path%3E%3C/svg%3E")',
        'ambient-glow': 'radial-gradient(circle, rgba(0,151,167,0.15) 0%, rgba(0,151,167,0) 70%)',
        'ambient-glow-dark': 'radial-gradient(circle, rgba(0,188,212,0.1) 0%, rgba(0,188,212,0) 70%)',
        'ambient-top': 'linear-gradient(to bottom, rgba(0,151,167,0.05) 0%, transparent 50%)',
        'ambient-bottom': 'linear-gradient(to top, rgba(0,151,167,0.05) 0%, transparent 50%)',
      },
      fontFamily: {
        'poppins': ['var(--font-poppins)', 'Poppins', 'sans-serif'],
        'opensans': ['var(--font-open-sans)', 'Open Sans', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        'button': '0.75rem',
      },
      spacing: {
        'section-y': '3rem',
        'element-gap': '1.5rem',
        'footer-y': '2rem',
      },
      boxShadow: {
        'button': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'ambient-sm': '0 0 15px 0 rgba(0, 151, 167, 0.1)',
        'ambient-md': '0 0 25px 0 rgba(0, 151, 167, 0.15)',
        'ambient-lg': '0 0 40px 0 rgba(0, 151, 167, 0.2)',
        'ambient-inner': 'inset 0 0 15px 0 rgba(0, 151, 167, 0.1)',
        'card-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05), 0 0 15px 0 rgba(0, 151, 167, 0.1)',
        'dark-ambient-sm': '0 0 15px 0 rgba(0, 188, 212, 0.05)',
        'dark-ambient-md': '0 0 25px 0 rgba(0, 188, 212, 0.1)',
        'dark-ambient-lg': '0 0 40px 0 rgba(0, 188, 212, 0.15)',
      },
      gridTemplateColumns: {
        'desktop': 'repeat(12, minmax(0, 1fr))',
        'tablet': 'repeat(2, minmax(0, 1fr))',
        'mobile': 'repeat(1, minmax(0, 1fr))',
      },
      gap: {
        'desktop': '24px',
        'tablet': '16px',
        'mobile': '12px',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      maxWidth: {
        'site': '1200px',
      }
    },
  },
  plugins: [],
}
