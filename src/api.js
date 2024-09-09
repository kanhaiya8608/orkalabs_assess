// api.js
import axios from 'axios';

// Base URL for the API
const API_URL = 'https://dummyjson.com';

// Function to fetch a product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to fetch all products
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to log in
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};
