// store/slices/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dish } from '../types';
import { loadState, saveState } from '../store/utils/localStorage';

interface CartItem extends Dish {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = loadState() || {
  items: [],
  total: 0,
};

const calculateTotal = (items: CartItem[]) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.items.findIndex((item) => item._id === action.payload._id);
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.total = calculateTotal(state.items);
    },
    removeFromCart: (state, action: PayloadAction<{ _id: string }>) => {
      state.items = state.items.filter((item) => item._id !== action.payload._id);
      state.total = calculateTotal(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
