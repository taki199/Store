import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCategories as fetchCategoriesAPI, fetchDishesByCategory as fetchDishesByCategoryAPI } from '../api/Categories';

interface CategoryState {
  categories: any[];
  dishesByCategory: any[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  dishesByCategory: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const categories = await fetchCategoriesAPI();
  return categories;
});

export const fetchDishesByCategoryAsync = createAsyncThunk(
  'categories/fetchDishesByCategory',
  async (categoryId: string) => {
    const dishes = await fetchDishesByCategoryAPI(categoryId);
    return dishes;
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch categories';
      })
      .addCase(fetchDishesByCategoryAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDishesByCategoryAsync.fulfilled, (state, action) => {
        state.dishesByCategory = action.payload;
        state.loading = false;
      })
      .addCase(fetchDishesByCategoryAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch dishes by category';
      });
  },
});

export default categorySlice.reducer;
