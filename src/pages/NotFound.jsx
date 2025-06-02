// This is our 404 page! It shows up when someone tries to visit a page that doesn't exist
// We make it friendly and helpful by showing a message and a button to go back home

import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        {/* Big 404 text */}
        <h1 className="text-9xl font-bold text-green-600">404</h1>
        
        {/* Friendly message */}
        <p className="mt-4 text-xl text-gray-600">
          Oops! Looks like you've wandered into the wrong field.
        </p>
        
        {/* Button to go back home */}
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 