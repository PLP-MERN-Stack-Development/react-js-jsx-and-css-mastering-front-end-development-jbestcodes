import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { NavigationProvider } from './context/NavigationContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import './App.css';

/**
 * Main App Layout Component
 */
function AppLayout() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Navbar */}
      <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 min-h-screen">
        <Dashboard />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

/**
 * Root App Component with Theme and Navigation Providers
 */
function App() {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <AppLayout />
      </NavigationProvider>
    </ThemeProvider>
  );
}

export default App; 