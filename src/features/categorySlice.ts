// categorySlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchCategories, fetchDishesByCategory } from '../api/Categories';
import { Dish } from '../types'; // Import the Dish type

interface Category {
  _id: string;
  name: string;
  image: {
    url: string;
    publicId: string;
  };
}

interface CategoryState {
  categories: Category[];
  dishesByCategory: Dish[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  dishesByCategory: [],
  loading: false,
  error: null,
};

export const fetchCategoriesAsync = createAsyncThunk<Category[]>('categories/fetchCategories', async () => {
  const categories = await fetchCategories();
  return categories;
});

export const fetchDishesByCategoryAsync = createAsyncThunk<Dish[], string>(
  'categories/fetchDishesByCategory',
  async (categoryId) => {
    const dishes = await fetchDishesByCategory(categoryId);
    return dishes;
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategoriesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch categories';
      })
      .addCase(fetchDishesByCategoryAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDishesByCategoryAsync.fulfilled, (state, action: PayloadAction<Dish[]>) => {
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
