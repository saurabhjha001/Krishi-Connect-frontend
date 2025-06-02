import axios from 'axios';

// This is where we handle all our API calls to the backend
// For now, we're using JSON Server as a mock backend
// Later, we can easily switch to a real backend by changing these functions

// Base URL for our API (JSON Server running on port 5000)
const API_BASE_URL = 'http://localhost:5000/api';

const headers = {
    'Content-Type': 'application/json',
};

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
};

export const api = {
    // Get all products
    getProducts: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/products`, {
                method: 'GET',
                headers,
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    // Add new product
    addProduct: async (productData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/products`, {
                method: 'POST',
                headers,
                body: JSON.stringify(productData),
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error adding product:', error);
            throw error;
        }
    },

    // Delete product
    deleteProduct: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/products/${id}`, {
                method: 'DELETE',
                headers,
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    },
};

export default api; 