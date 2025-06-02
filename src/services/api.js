import axios from 'axios';

// Mock data for local development
const mockProducts = [
    {
        id: 1,
        name: "Wheat",
        type: "Grains",
        price: 2100,
        marketPrice: 2250,
        quantity: 100,
        unit: "kg"
    },
    {
        id: 2,
        name: "Rice",
        type: "Grains",
        price: 3200,
        marketPrice: 3100,
        quantity: 50,
        unit: "kg"
    },
    {
        id: 3,
        name: "Sugarcane",
        type: "Cash Crops",
        price: 350,
        marketPrice: 380,
        quantity: 1000,
        unit: "kg"
    }
];

// Original backend URL (commented out for now)
// const API_BASE_URL = 'https://crop-backend.onrender.com/api';

// Original axios instance (commented out for now)
/*
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response) {
            const errorMessage = error.response.data?.message || 'Server error occurred';
            throw new Error(errorMessage);
        } else if (error.request) {
            throw new Error('No response from server. Please check your internet connection.');
        } else {
            throw new Error('Failed to make request. Please try again later.');
        }
    }
);
*/

// Helper function to simulate network delay
const simulateNetworkDelay = () => new Promise(resolve => setTimeout(resolve, 500));

export const api = {
    // Get all products
    getProducts: async () => {
        try {
            await simulateNetworkDelay(); // Simulate network delay
            return [...mockProducts]; // Return a copy of the mock data
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    // Add new product
    addProduct: async (productData) => {
        try {
            await simulateNetworkDelay(); // Simulate network delay
            const newProduct = {
                id: Date.now(), // Generate a unique ID
                ...productData,
                // Ensure numeric values
                price: Number(productData.price),
                marketPrice: Number(productData.marketPrice),
                quantity: Number(productData.quantity)
            };
            mockProducts.push(newProduct);
            return newProduct;
        } catch (error) {
            console.error('Error adding product:', error);
            throw error;
        }
    },

    // Delete product
    deleteProduct: async (id) => {
        try {
            await simulateNetworkDelay(); // Simulate network delay
            const index = mockProducts.findIndex(p => p.id === id);
            if (index === -1) {
                throw new Error('Product not found');
            }
            mockProducts.splice(index, 1);
            return { message: 'Product deleted successfully' };
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    },

    // Helper function to calculate price difference
    calculatePriceDifference: (price, marketPrice) => {
        return Number(marketPrice) - Number(price);
    },

    // Helper function to calculate total value
    calculateTotalValue: (price, quantity) => {
        return Number(price) * Number(quantity);
    }
};

export default api; 