import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: '',
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearAuth: (state) => {
      state.accessToken = '';
      state.user = null;
    },
  },
});

export const { setAccessToken, setUser, clearAuth } = authSlice.actions;

export const selectAccessToken = (state) => state.auth.accessToken;

export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
