// This is our header component! It shows the app name and navigation links.
// I added a language toggle button so farmers can switch between Hindi and English.

import React from 'react';
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

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* App name/logo that links to home page */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            {t.brand}
          </Link>

          {/* Navigation links and language toggle button */}
          <div className="flex items-center space-x-6">
            {/* Home page link */}
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              {t.home}
            </Link>
            {/* Add product page link */}
            <Link
              to="/add"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              {t.addProduct}
            </Link>
            {/* Button to switch between Hindi and English */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
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
