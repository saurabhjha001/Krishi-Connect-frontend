// This is our footer component! It shows up at the bottom of every page
// with a simple credit message and some nice styling.

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-500">
          Made by Saurabh Kumar Jha
        </p>
      </div>
    </footer>
  );
};

export default Footer; 