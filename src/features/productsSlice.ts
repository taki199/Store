// productsSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDishes, fetchDishById } from '../api/Dishes';
import { Dish } from '../types/index';

interface ProductsState {
  products: Dish[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetchDishes();
    console.log('Fetched all products:', response);
    return response;
  }
);

export const fetchDishByIdAsync = createAsyncThunk(
  'products/fetchDishById',
  async (id: string, { rejectWithValue }) => {
    try {
      const dish = await fetchDishById(id);
      console.log('API response for fetchDishById:', dish);
      if (!dish) {
        throw new Error('Failed to fetch dish');
      }
      return dish;
    } catch (error:any) {
      console.error('Error fetching dish by ID:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        console.log('Fetching all products...');
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
        console.log('Fetched all products:', action.payload);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
        console.error('Failed to fetch products:', action.error.message);
      })
      .addCase(fetchDishByIdAsync.pending, (state) => {
        state.status = 'loading';
        console.log('Fetching dish by ID...');
      })
      .addCase(fetchDishByIdAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload) {
          state.products = [action.payload]; // Replace existing products with the fetched dish
          console.log('Fetched dish:', action.payload);
        } else {
          console.warn('No dish found with the given ID');
        }
      })
      .addCase(fetchDishByIdAsync.rejected, (state:any, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch dish';
        console.error('Failed to fetch dish:', action.payload);
      });
  },
});

export default productsSlice.reducer;
