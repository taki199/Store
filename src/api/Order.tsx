// orderApi.ts

import axios from 'axios';

const baseURL = 'http://localhost:5001/api';

// Function to fetch orders with authentication
export const fetchOrders = async (token: string) => {
  try {
    const response = await axios.get(`${baseURL}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// Function to create order with authentication
export const createOrder = async (orderData: any, token: string) => {
  try {
    const response = await axios.post(`${baseURL}/orders`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};
