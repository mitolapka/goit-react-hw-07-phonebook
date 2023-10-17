import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = `https://652c1f69d0d1df5273ef2b58.mockapi.io/contacts`;

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
    const response = await axios.get('/contacts');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

export const addContact = createAsyncThunk('contacts/addContact', async (newContact) => {
  try {
    const dataToSend = {
      name: newContact.name,
      phone: newContact.number,
    };

    const response = await axios.post('/contacts', dataToSend);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});


export const deleteContact = createAsyncThunk('contacts/deleteContact', async (contactId) => {
  try {
    await axios.delete(`/contacts/${contactId}`);
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
    }},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      
      builder
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.items = state.contacts.items.filter(contact => contact.id !== action.payload);
      })

  },
});

export default contactsSlice.reducer;
export const { setFilter } = contactsSlice.actions;
