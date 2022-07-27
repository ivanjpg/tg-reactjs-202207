// En Redux tenemos únicamente un store
// centralizado para toda la aplicación.

import { configureStore } from "@reduxjs/toolkit";

import todoReducer from './features/todo/todoSlice';

export default configureStore({
  reducer: {
    todos: todoReducer
  }
});