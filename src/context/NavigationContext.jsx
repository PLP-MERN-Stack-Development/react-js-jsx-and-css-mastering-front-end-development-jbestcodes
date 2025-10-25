import React, { createContext, useContext, useState } from 'react';

// Create the navigation context
const NavigationContext = createContext();

/**
 * Custom hook to use the navigation context
 * @returns {Object} Navigation context value
 */
export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

/**
 * Navigation provider component for managing active section
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} - Navigation provider
 */
export const NavigationProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState('overview');

  /**
   * Navigate to a specific section
   * @param {string} section - Section to navigate to
   */
  const navigateToSection = (section) => {
    setActiveSection(section);
    // Smooth scroll to top when changing sections
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const value = {
    activeSection,
    setActiveSection,
    navigateToSection,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationContext;