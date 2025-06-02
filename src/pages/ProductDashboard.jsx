// This is our Product Dashboard page! It shows a list of all products
// with their details and lets us delete products we don't want anymore.

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';

// All the text we need in both languages
const translations = {
  en: {
    title: 'Product List',
    addNew: 'Add New Product',
    name: 'Name',
    type: 'Type',
    price: 'Price',
    marketPrice: 'Market Price',
    quantity: 'Quantity',
    actions: 'Actions',
    delete: 'Delete',
    loading: 'Loading products...',
    error: 'Error loading products',
    deleteError: 'Error deleting product',
    noProducts: 'No products found',
    searchPlaceholder: 'Search by name or type...',
    priceDiff: 'Price Difference',
    notAvailable: 'N/A',
    viewMarketPrice: 'View Market Price',
    deleteConfirm: 'Are you sure you want to delete this product?',
    confirm: 'Yes, Delete',
    cancel: 'Cancel',
    profit: 'Profit',
    loss: 'Loss',
    filterByQuantity: 'Filter by quantity',
    showAll: 'Show All',
    inStock: 'In Stock',
    outOfStock: 'Out of Stock'
  },
  hi: {
    title: 'मेरे फसल उत्पाद',
    addNew: 'नया उत्पाद जोड़ें',
    name: 'नाम',
    type: 'प्रकार',
    price: 'मूल्य',
    marketPrice: 'बाजार मूल्य',
    quantity: 'मात्रा',
    actions: 'कार्रवाई',
    delete: 'हटाएं',
    loading: 'उत्पाद लोड हो रहे हैं...',
    error: 'उत्पाद लोड करने में त्रुटि',
    deleteError: 'उत्पाद हटाने में त्रुटि',
    noProducts: 'कोई उत्पाद नहीं मिला',
    searchPlaceholder: 'नाम या प्रकार से खोजें...',
    priceDiff: 'मूल्य अंतर',
    notAvailable: 'उपलब्ध नहीं',
    viewMarketPrice: 'मंडी मूल्य देखें',
    deleteConfirm: 'क्या आप वाकई इस उत्पाद को हटाना चाहते हैं?',
    confirm: 'हाँ, हटाएं',
    cancel: 'रद्द करें',
    profit: 'लाभ',
    loss: 'घाटा',
    filterByQuantity: 'मात्रा के अनुसार फ़िल्टर करें',
    showAll: 'सभी दिखाएं',
    inStock: 'स्टॉक में',
    outOfStock: 'स्टॉक में नहीं'
  }
};

// Helper function to format prices in Indian Rupees
const formatPrice = (price) => {
  if (!price && price !== 0) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};

const ProductDashboard = () => {
  // Get the current language
  const { language } = useLanguage();
  const t = translations[language];

  // State for products, loading, and errors
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [quantityFilter, setQuantityFilter] = useState('all');

  // Load products when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(t.error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [t.error]);

  // Handle product deletion
  const handleDelete = async (id) => {
    try {
      await api.deleteProduct(id);
      setProducts(products.filter(product => product.id !== id));
    } catch (err) {
      setError(t.deleteError);
    }
  };

  // Filter products based on search query and quantity filter
  const filteredProducts = products.filter(product => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = (
      (product.name?.toLowerCase() || '').includes(query) ||
      (product.type?.toLowerCase() || '').includes(query)
    );
    
    const matchesQuantity = quantityFilter === 'all' ? true :
      quantityFilter === 'inStock' ? (product.quantity || 0) > 0 :
      (product.quantity || 0) === 0;

    return matchesSearch && matchesQuantity;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-600">{t.loading}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with title and add button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t.title}</h1>
          <Link
            to="/add"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {t.addNew}
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <select
            value={quantityFilter}
            onChange={(e) => setQuantityFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="all">{t.showAll}</option>
            <option value="inStock">{t.inStock}</option>
            <option value="outOfStock">{t.outOfStock}</option>
          </select>
        </div>

        {/* Products list */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">{t.noProducts}</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {/* Table header - hidden on mobile */}
              <div className="hidden sm:grid grid-cols-7 gap-4 px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="col-span-2">{t.name}</div>
                <div>{t.type}</div>
                <div>{t.price}</div>
                <div>{t.marketPrice}</div>
                <div>{t.priceDiff}</div>
                <div className="text-right">{t.actions}</div>
              </div>

              {/* Product rows */}
              {filteredProducts.map((product, index) => {
                const priceDiff = (product.marketPrice || 0) - (product.price || 0);
                const isPriceHigher = priceDiff >= 0;
                const showPriceTag = Math.abs(priceDiff) > 10;

                return (
                  <div
                    key={product.id}
                    className={`grid grid-cols-1 sm:grid-cols-7 gap-4 px-4 sm:px-6 py-4 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } hover:bg-blue-50`}
                  >
                    {/* Product Name - Full width on mobile */}
                    <div className="col-span-1 sm:col-span-2 flex items-center gap-2">
                      <span className="text-lg">🌿</span>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {product.name || t.notAvailable}
                        </h3>
                        <p className="text-xs text-gray-500 sm:hidden">
                          {product.type || t.notAvailable}
                        </p>
                      </div>
                    </div>

                    {/* Type - Hidden on mobile */}
                    <div className="hidden sm:block text-sm text-gray-500">
                      {product.type || t.notAvailable}
                    </div>

                    {/* Price */}
                    <div className="flex justify-between sm:block text-sm">
                      <span className="text-gray-500 sm:hidden">{t.price}:</span>
                      <span className="text-gray-900">{formatPrice(product.price)}</span>
                    </div>

                    {/* Market Price */}
                    <div className="flex justify-between sm:block text-sm">
                      <span className="text-gray-500 sm:hidden">{t.marketPrice}:</span>
                      <a
                        href="https://agmarknet.gov.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        title={t.viewMarketPrice}
                        className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                      >
                        {formatPrice(product.marketPrice)}
                      </a>
                    </div>

                    {/* Price Difference */}
                    <div className="flex justify-between sm:block text-sm">
                      <span className="text-gray-500 sm:hidden">{t.priceDiff}:</span>
                      <span className={`font-medium ${isPriceHigher ? 'text-green-600' : 'text-red-600'}`}>
                        {isPriceHigher ? '+' : ''}{formatPrice(priceDiff)}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end">
                      <button
                        onClick={() => setDeleteConfirmId(product.id)}
                        className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        {t.delete}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirmId && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
              <h3 className="text-lg font-medium text-gray-900 mb-4">{t.deleteConfirm}</h3>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={() => {
                    handleDelete(deleteConfirmId);
                    setDeleteConfirmId(null);
                  }}
                  className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  {t.confirm}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDashboard; 