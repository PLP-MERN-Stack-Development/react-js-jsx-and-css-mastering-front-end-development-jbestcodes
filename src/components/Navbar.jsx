import React from 'react';
import Button from './Button';

/**
 * Navigation component for DevJourney app
 * @param {Object} props - Component props
 * @param {function} props.toggleTheme - Theme toggle function
 * @param {boolean} props.isDarkMode - Current theme state
 * @returns {JSX.Element} - Navbar component
 */
const Navbar = ({ toggleTheme, isDarkMode }) => {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg border-b-2 border-red-900/10 dark:border-red-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-red-900 to-green-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">DJ</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Dev<span className="text-red-900 dark:text-red-400">Journey</span>
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Your coding adventure tracker</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <a
                href="#dashboard"
                className="text-gray-700 dark:text-gray-300 hover:text-red-900 dark:hover:text-red-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Dashboard
              </a>
              <a
                href="#coding"
                className="text-gray-700 dark:text-gray-300 hover:text-red-900 dark:hover:text-red-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Coding
              </a>
              <a
                href="#wellness"
                className="text-gray-700 dark:text-gray-300 hover:text-red-900 dark:hover:text-red-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Wellness
              </a>
              <a
                href="#music"
                className="text-gray-700 dark:text-gray-300 hover:text-red-900 dark:hover:text-red-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Music
              </a>
            </div>
          </div>

          {/* Theme Toggle and Actions */}
          <div className="flex items-center space-x-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleTheme}
              className="flex items-center space-x-1"
            >
              {isDarkMode ? (
                <>
                  <span className="text-yellow-500">☀️</span>
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <span className="text-blue-500">🌙</span>
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </Button>
            
            <Button variant="primary" size="sm">
              Add Goal
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;