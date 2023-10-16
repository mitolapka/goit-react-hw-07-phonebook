import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  contacts: {
    items: [], 
    isLoading: false,
    error: null,
  },
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.contacts.items.push(action.payload);
    },
    removeContact: (state, action) => {
      state.contacts.items = state.contacts.items.filter(contact => contact.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addContact, removeContact, setFilter } = contactsSlice.actions;
export const selectContacts = state => state.contacts.items; 
export const selectFilter = state => state.contacts.filter;

export default configureStore({
  reducer: {
    contacts: contactsSlice.reducer,
  },
});
export { fetchContacts, deleteContact };
