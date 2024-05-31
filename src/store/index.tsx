// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cartSlice';
import productsReducer from '../features/productsSlice';
import { saveState } from './utils/localStorage';
import categoryReducer  from '../features/categorySlice'
import authReducer from '../features/authSlice'



const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    products: productsReducer,
    category: categoryReducer,
   
  },
});

store.subscribe(() => {
  saveState(store.getState().cart);
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
