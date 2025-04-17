"use client";

import { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // This effect runs only once when the component is mounted
  useEffect(() => {
    setMounted(true);
    
    // Initialize based on localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldUseDarkMode = savedTheme === 'dark' || (!savedTheme && systemPreference);
    
    if (shouldUseDarkMode) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  // Don't render anything until the component is mounted
  // This prevents hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 p-3 rounded-full shadow-lg bg-white dark:bg-benfresh-dark-surface border border-gray-200 dark:border-benfresh-dark-tealLight transition-all hover:scale-110"
      aria-label={isDarkMode ? "Zum hellen Modus wechseln" : "Zum dunklen Modus wechseln"}
    >
      {isDarkMode ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-benfresh-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
