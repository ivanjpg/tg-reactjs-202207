import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CartsDataService from '../services/cartsService';

export const getUserCarts = createAsyncThunk(
  'carts/user/get',
  async (id) => {
    const res = await CartsDataService.getUserCarts(id);

    return res.data;
  }
);

export const cartsSlice = createSlice({
  name: 'carts',
  initialState: [],
  // initialState: {
  //   carts: [],
  //   pagination: 3,
  //   loading: false,
  //   error: false,
  //   errorMessages: []
  // },
  reducers: {},
  extraReducers: {
    [getUserCarts.fulfilled]: (state,action) => {
      return action.payload.carts;
    },
    [getUserCarts.pending]: (state,action) => {
      console.log(`getUserCarts.pending: ${JSON.stringify(action)}`);
      //state.loading = true;
    },
    [getUserCarts.rejected]: (state,action) => {
      console.log(`getUserCarts.rejected: ${JSON.stringify(action)}`);
      // state.loading = false;
      // state.error = true;
      // state.errorMessages.push(action.meta.error...);
    }
  },
});

export default cartsSlice.reducer;