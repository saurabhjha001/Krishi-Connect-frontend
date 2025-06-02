// This is our main App component! It's like the boss of our application
// It sets up all the routes and decides what to show when you visit different pages

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import ProductDashboard from './pages/ProductDashboard';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    // Router helps us handle different pages in our app
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Header shows up on every page */}
        <Header />
        
        {/* Main content area */}
        <main className="flex-grow">
          {/* Routes decide what to show based on the URL */}
          <Routes>
            {/* When you visit the home page (/) */}
            <Route path="/" element={<Home />} />
            
            {/* When you visit the products page (/products) */}
            <Route path="/products" element={<ProductDashboard />} />
            
            {/* When you visit the add product page (/add) */}
            <Route path="/add" element={<AddProduct />} />
            
            {/* If you visit any other page, show the 404 page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer shows up on every page */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
