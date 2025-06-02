import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

// Predefined options for units
const unitOptions = [
  { value: 'kg', label: 'Kilogram (kg)' },
  { value: 'ton', label: 'Metric Ton (ton)' },
  { value: 'quintal', label: 'Quintal (qtl)' },
  { value: 'bunch', label: 'Bunch' },
  { value: 'piece', label: 'Piece' }
];

// Predefined product names
const productNames = [
  { value: 'wheat', label: 'Wheat' },
  { value: 'rice', label: 'Rice' },
  { value: 'corn', label: 'Corn' },
  { value: 'sugarcane', label: 'Sugarcane' },
  { value: 'cotton', label: 'Cotton' },
  { value: 'potato', label: 'Potato' },
  { value: 'tomato', label: 'Tomato' },
  { value: 'onion', label: 'Onion' },
  { value: 'chilli', label: 'Chilli' },
  { value: 'cabbage', label: 'Cabbage' },
  { value: 'cauliflower', label: 'Cauliflower' },
  { value: 'brinjal', label: 'Brinjal' },
  { value: 'cucumber', label: 'Cucumber' },
  { value: 'pumpkin', label: 'Pumpkin' },
  { value: 'mango', label: 'Mango' },
  { value: 'banana', label: 'Banana' },
  { value: 'apple', label: 'Apple' },
  { value: 'orange', label: 'Orange' },
  { value: 'grapes', label: 'Grapes' },
  { value: 'pomegranate', label: 'Pomegranate' }
];

// Predefined product types
const productTypes = [
  { value: 'grains', label: 'Grains' },
  { value: 'vegetables', label: 'Vegetables' },
  { value: 'fruits', label: 'Fruits' },
  { value: 'cash_crops', label: 'Cash Crops' },
  { value: 'pulses', label: 'Pulses' },
  { value: 'spices', label: 'Spices' }
];

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: '',
    marketPrice: '',
    quantity: '',
    unit: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsSubmitting(true);

    try {
      await api.addProduct({
        ...formData,
        price: Number(formData.price),
        marketPrice: Number(formData.marketPrice),
        quantity: Number(formData.quantity)
      });
      setSuccess(true);
      setFormData({
        name: '',
        type: '',
        price: '',
        marketPrice: '',
        quantity: '',
        unit: ''
      });
      setTimeout(() => {
        navigate('/products');
      }, 2000);
    } catch (err) {
      setError('Failed to add product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between mb-6 sm:mb-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Add New Product</h1>
            <p className="mt-2 text-sm text-gray-600">
              Fill in the details below to add a new product to your inventory.
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <a
              href="/products"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </a>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6">
          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">Product added successfully!</span>
            </div>
          )}

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    list="product-names"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Type or select a product"
                    required
                  />
                  <datalist id="product-names">
                    {productNames.map(product => (
                      <option key={product.value} value={product.label} />
                    ))}
                  </datalist>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">
                  Type to search or select from the list
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Type
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    list="product-types"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Type or select a type"
                    required
                  />
                  <datalist id="product-types">
                    {productTypes.map(type => (
                      <option key={type.value} value={type.label} />
                    ))}
                  </datalist>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">
                  Type to search or select from the list
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price (₹)
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">₹</span>
                  </div>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="0.00"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Market Price (₹)
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">₹</span>
                  </div>
                  <input
                    type="number"
                    name="marketPrice"
                    value={formData.marketPrice}
                    onChange={handleChange}
                    className="block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="0.00"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="block w-full rounded-l-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter quantity"
                    required
                    min="0"
                    step="0.01"
                  />
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    className="block w-32 rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  >
                    <option value="">Select unit</option>
                    {unitOptions.map(unit => (
                      <option key={unit.value} value={unit.value}>
                        {unit.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate('/products')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Adding...' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct; 