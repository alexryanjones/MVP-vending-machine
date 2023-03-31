import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: '',
  user: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      state.isLoggedIn = true;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearAuth: (state) => {
      state.accessToken = '';
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setAccessToken, setUser, clearAuth } = authSlice.actions;

export const selectAccessToken = (state) => state.auth.accessToken;

export const selectUser = (state) => state.auth.user;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn; // new selector for logged-in state

export default authSlice.reducer;
