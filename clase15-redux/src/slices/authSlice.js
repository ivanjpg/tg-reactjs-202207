import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthDataService from '../services/authService';

export const authLogin = createAsyncThunk(
  'auth/login',
  async (data) => {
    const res = await AuthDataService.login(data);

    return res.data;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {},
  extraReducers: {
    [authLogin.fulfilled]: (state,action) => {
      return action.payload;
    }
  }
});

export default authSlice.reducer;