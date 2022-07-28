import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import ProducsDataService from '../services/productsService';

export const getProducts = createAsyncThunk(
  'products/get',
  async () => {
    const res = await ProducsDataService.getAll();

    return res.data;
  }
);

export const searchProducts = createAsyncThunk(
  'products/search',
  async (q) => {
    const res = await ProducsDataService.search(q);

    return res.data;
  }
)

export const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {},
  // Para utilizar reducers que usen
  // recursos externos asíncronos, los
  // localizamos en este nuevo apartado
  extraReducers: {
    // De getProducts consideramos el caso
    // en el que todo va bien y acorde a ello
    // alteramos el estado.
    [getProducts.fulfilled]: (state,action) => {
      return action.payload.products;
    },
    [searchProducts.fulfilled]: (state,action) => {
      return action.payload.products;
    }
  }
});

// Debemos exportar el reducer
export default productsSlice.reducer;