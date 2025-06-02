import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

// Utility functions for formatting and calculations
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

const calculateProfitLoss = (sellingPrice, marketPrice, quantity) => {
  const sellingTotal = sellingPrice * quantity;
  const marketTotal = marketPrice * quantity;
  const difference = sellingTotal - marketTotal;
  const percentage = marketTotal !== 0 ? (difference / marketTotal) * 100 : 0;
  
  return {
    sellingTotal,
    marketTotal,
    difference,
    percentage
  };
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await api.getProducts();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch products');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.deleteProduct(id);
        setProducts(products.filter(product => product._id !== id));
      } catch (err) {
        setError('Failed to delete product');
      }
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="mt-2 text-sm text-gray-600">
            View and manage your product inventory with detailed pricing information.
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <a
            href="/add-product"
            className="btn bg-blue-600 text-white hover:bg-blue-700"
          >
            Add New Product
          </a>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 gap-4 p-4">
          {products.map((product) => {
            const { sellingTotal, marketTotal, difference, percentage } = calculateProfitLoss(
              product.price,
              product.marketPrice,
              product.quantity
            );

            return (
              <div
                key={product._id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-4 flex-1">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-500">Type: {product.type}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-500">Selling Price:</span>
                          <span className="text-sm font-semibold">
                            {formatCurrency(product.price)} per {product.unit}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-500">Quantity:</span>
                          <span className="text-sm font-semibold">
                            {product.quantity} {product.unit}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-500">Total Selling Value:</span>
                          <span className="text-sm font-semibold">
                            {formatCurrency(sellingTotal)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-500">Market Price:</span>
                          <span className="text-sm font-semibold">
                            {formatCurrency(product.marketPrice)} per {product.unit}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-500">Total Market Value:</span>
                          <span className="text-sm font-semibold">
                            {formatCurrency(marketTotal)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-500">Profit/Loss:</span>
                          <span className={`text-sm font-semibold flex items-center ${
                            difference >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {difference >= 0 ? '📈' : '📉'} {formatCurrency(difference)}
                            <span className="ml-2">
                              ({percentage >= 0 ? '+' : ''}{percentage.toFixed(2)}%)
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ml-4">
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn bg-red-600 text-white hover:bg-red-700 px-3 py-1 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductList; 