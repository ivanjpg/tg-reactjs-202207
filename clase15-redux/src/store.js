import { configureStore } from "@reduxjs/toolkit";

import productsReducer from './slices/productsSlice';
import authReducer from './slices/authSlice';
import cartsReducer from './slices/cartsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
    carts: cartsReducer,
  }
});