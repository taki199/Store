// orderSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrders, createOrder } from '../api/Order';

interface Order {
  // Define the structure of an order
}

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

export const fetchOrdersAsync = createAsyncThunk('orders/fetchOrders', async (_, { getState }) => {
    const { auth }:any = getState();
    const token = auth.token; // Assuming the token is stored in the auth state
    return fetchOrders(token);
  });

  export const createOrderAsync = createAsyncThunk('orders/createOrder', async (orderData, { getState }) => {
    const { auth }:any = getState();
    const token = auth.token; // Assuming the token is stored in the auth state
    return createOrder(orderData, token);
  });
  

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch orders';
      })
      .addCase(createOrderAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create order';
      });
  },
});

export default orderSlice.reducer;
