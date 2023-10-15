import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://652bc448d0d1df5273eeaf34.mockapi.io';
const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  try {
    const response = await axios.get(`https://652bc448d0d1df5273eeaf34.mockapi.io/contacts`);
    return response.data;
  } catch (error) {
    throw error.response.data; 
  }
});

export const addContact = createAsyncThunk('contacts/addContact', async (newContact) => {
  try {
    const response = await axios.post(`https://652bc448d0d1df5273eeaf34.mockapi.io/contacts`, newContact);
    return response.data;
  } catch (error) {
    throw error.response.data; 
  }
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (contactId) => {
  try {
    await axios.delete(`https://652bc448d0d1df5273eeaf34.mockapi.io/contacts/${contactId}`);
    return contactId;
  } catch (error) {
    throw error.response.data; 
  }
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.contacts.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.items = state.contacts.items.filter((contact) => contact.id !== action.payload);
      });
  },
});

export const { setFilter } = contactsSlice.actions;
export default contactsSlice.reducer;
