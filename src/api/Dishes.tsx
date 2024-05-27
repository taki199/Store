// api/dishesAPI.ts
import axios from 'axios';

const baseURL = 'http://localhost:5001/api';

export const fetchDishes = async () => {
  try {
    const response = await axios.get('http://localhost:5001/api/dishes');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching dishes:', error);
    throw error;
  }
};
