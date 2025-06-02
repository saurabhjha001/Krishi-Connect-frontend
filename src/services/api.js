import axios from 'axios';

// This is where we handle all our API calls to the backend
// For now, we're using JSON Server as a mock backend
// Later, we can easily switch to a real backend by changing these functions

// Base URL for our API (deployed backend on Render)
const API_BASE_URL = 'https://crop-backend.onrender.com/api';

// Create axios instance with default config
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    // Add timeout to prevent hanging requests
    timeout: 10000,
});

// Add response interceptor for better error handling
axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const errorMessage = error.response.data?.message || 'Server error occurred';
            throw new Error(errorMessage);
        } else if (error.request) {
            // The request was made but no response was received
            throw new Error('No response from server. Please check your internet connection.');
        } else {
            // Something happened in setting up the request that triggered an Error
            throw new Error('Failed to make request. Please try again later.');
        }
    }
);

export const api = {
    // Get all products
    getProducts: async () => {
        try {
            return await axiosInstance.get('/products');
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    // Add new product
    addProduct: async (productData) => {
        try {
            return await axiosInstance.post('/products', productData);
        } catch (error) {
            console.error('Error adding product:', error);
            throw error;
        }
    },

    // Delete product
    deleteProduct: async (id) => {
        try {
            return await axiosInstance.delete(`/products/${id}`);
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    },
};

export default api; 