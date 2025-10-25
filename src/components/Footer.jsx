import React from 'react';
import { useNavigation } from '../context/NavigationContext';

/**
 * Footer component for DevJourney app
 * @returns {JSX.Element} - Footer component
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { navigateToSection } = useNavigation();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-red-900 to-green-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DJ</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Dev<span className="text-red-900 dark:text-red-400">Journey</span>
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              Track your coding progress, wellness activities, and discover music that fuels your development journey. 
              Built with React, Tailwind CSS, and passion for learning.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-900 dark:hover:text-red-400 transition-colors"
              >
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-800 dark:hover:text-green-600 transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => navigateToSection('overview')} 
                  className="text-gray-600 dark:text-gray-400 hover:text-red-900 dark:hover:text-red-400 transition-colors text-left"
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateToSection('coding')} 
                  className="text-gray-600 dark:text-gray-400 hover:text-red-900 dark:hover:text-red-400 transition-colors text-left"
                >
                  Coding Tracker
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateToSection('wellness')} 
                  className="text-gray-600 dark:text-gray-400 hover:text-red-900 dark:hover:text-red-400 transition-colors text-left"
                >
                  Wellness
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateToSection('music')} 
                  className="text-gray-600 dark:text-gray-400 hover:text-red-900 dark:hover:text-red-400 transition-colors text-left"
                >
                  Music Discovery
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://react.dev/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-800 dark:hover:text-green-600 transition-colors"
                >
                  React Docs
                </a>
              </li>
              <li>
                <a 
                  href="https://tailwindcss.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-800 dark:hover:text-green-600 transition-colors"
                >
                  Tailwind CSS
                </a>
              </li>
              <li>
                <a 
                  href="https://developer.mozilla.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-800 dark:hover:text-green-600 transition-colors"
                >
                  MDN Web Docs
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-800 dark:hover:text-green-600 transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {currentYear} DevJourney. Built with ❤️ for aspiring developers.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#privacy" className="text-gray-600 dark:text-gray-400 hover:text-red-900 dark:hover:text-red-400 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-gray-600 dark:text-gray-400 hover:text-red-900 dark:hover:text-red-400 text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;