// This is our language context! It helps us manage the app's language (Hindi/English)
// across all components without passing props everywhere.
// I learned about Context API from React docs and it's super useful!

import React, { createContext, useContext, useState } from 'react';

// Create a new context for language
const LanguageContext = createContext();

// This is a custom hook that makes it easy to use our language context
// It also shows a helpful error if we try to use it outside the provider
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// This is our provider component that wraps the app and provides language state
export const LanguageProvider = ({ children }) => {
  // Start with English as default language
  const [language, setLanguage] = useState('en');

  // Function to switch between Hindi and English
  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'hi' : 'en'));
  };

  // Provide language state and toggle function to all children
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
