// src/api.js
const API_BASE = "https://crop-backend.onrender.com/api/products";

// Fetch All
export const getProducts = async () => {
  const res = await fetch(API_BASE);
  return res.json();
};

// Add Product
export const addProduct = async (product) => {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
};

// Delete Product
export const deleteProduct = async (id) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
  return res.json();
};
