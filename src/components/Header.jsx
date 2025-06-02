// This is our header component! It shows the app name and navigation links.
// I added a language toggle button so farmers can switch between Hindi and English.

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

// All the text we need in both languages
const translations = {
  en: {
    home: 'Home',
    addProduct: 'Add Product',
    brand: 'KrishiConnect',
    toggleLang: 'हिंदी'
  },
  hi: {
    home: 'होम',
    addProduct: 'उत्पाद जोड़ें',
    brand: 'कृषि कनेक्ट',
    toggleLang: 'English'
  }
};

const Header = () => {
  // Get the current language and function to switch languages
  const { language, toggleLanguage } = useLanguage();
  // Get the right translations for current language
  const t = translations[language];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* App name/logo that links to home page */}
          <Link 
            to="/" 
            className="text-xl sm:text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            {t.brand}
          </Link>

          {/* Hamburger menu button for mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Navigation links and language toggle button */}
          <div className={`${
            isMenuOpen ? 'block' : 'hidden'
          } md:flex md:items-center md:space-x-6 absolute md:relative top-16 md:top-0 left-0 right-0 bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 z-50`}>
            {/* Home page link */}
            <Link
              to="/"
              className="block md:inline-block text-gray-600 hover:text-blue-600 transition-colors py-2 md:py-0"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.home}
            </Link>
            {/* Add product page link */}
            <Link
              to="/add"
              className="block md:inline-block text-gray-600 hover:text-blue-600 transition-colors py-2 md:py-0"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.addProduct}
            </Link>
            {/* Button to switch between Hindi and English */}
            <button
              onClick={() => {
                toggleLanguage();
                setIsMenuOpen(false);
              }}
              className="w-full md:w-auto mt-2 md:mt-0 px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
            >
              {t.toggleLang}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
