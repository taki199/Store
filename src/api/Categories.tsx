// api/dishesAPI.ts
import axios from 'axios';

const baseURL = 'http://localhost:5001/api';

export const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:5001/api/categories');
    return response.data
  } catch (error) {
    console.error('Error fetching dishes:', error);
    throw error;
  }
};
export const fetchDishesByCategory = async (categoryId:any) => {
  try {
    const response = await axios.get(`http://localhost:5001/api/categories/${categoryId}/dishes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dishes by category:', error);
    throw error;
  }
};