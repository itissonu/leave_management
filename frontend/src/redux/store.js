// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import leaveReducer from './slice/leaveSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    leave: leaveReducer,
   
  },
});
