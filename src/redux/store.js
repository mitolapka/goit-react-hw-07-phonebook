import { configureStore } from '@reduxjs/toolkit';
import extraReducer from '../contactsSlice';

const store = configureStore({
  reducer: {
    contacts: extraReducer,
  },
});

export default store;