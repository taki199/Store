// api/Dishes.ts

import axios from 'axios';
import { Dish } from '../types/index';

export const fetchDishes = async () => {
  try {
    const response = await axios.get('http://localhost:5001/api/dishes');
    return response.data;
  } catch (error) {
    console.error('Error fetching dishes:', error);
    throw error;
  }
};

export const fetchDishById = async (id: string): Promise<Dish> => {
  try {
    const response = await axios.get(`http://localhost:5001/api/dishes/${id}`);
    const dish = response.data;
    dish.slug = generateSlug(dish.name, dish._id); // Generate slug based on name and id
    return dish;
  } catch (error) {
    console.error('Error fetching dish by ID:', error);
    throw error;
  }
};

const generateSlug = (name: string, id: string): string => {
  // Remove special characters and spaces from name
  const sanitizedName = name.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
  return `${sanitizedName}-${id}`;
};
