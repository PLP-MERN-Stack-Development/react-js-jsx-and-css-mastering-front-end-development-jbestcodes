import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const ThemeContext = createContext();

/**
 * Custom hook to use the theme context
 * @returns {Object} Theme context value
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

/**
 * Theme provider component for managing light/dark mode
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} - Theme provider
 */
export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to 'light'
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('devjourney-theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Update localStorage and apply theme class when theme changes
  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    localStorage.setItem('devjourney-theme', theme);
    
    // Apply theme to document root
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Only update if user hasn't manually set a preference
      const savedTheme = localStorage.getItem('devjourney-theme');
      if (!savedTheme) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  /**
   * Toggle between light and dark mode
   */
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  /**
   * Set theme explicitly
   * @param {boolean} isDark - Whether to set dark mode
   */
  const setTheme = (isDark) => {
    setIsDarkMode(isDark);
  };

  /**
   * Get current theme name
   * @returns {string} Current theme ('light' or 'dark')
   */
  const getTheme = () => {
    return isDarkMode ? 'dark' : 'light';
  };

  const value = {
    isDarkMode,
    toggleTheme,
    setTheme,
    getTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;