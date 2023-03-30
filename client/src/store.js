import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
