import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'; // You don't need to import React here
import { fetchContacts } from '../redux/contactsSlice';
import { selectContacts, selectFilter } from '../redux/selectors';
import { ContactForm } from '../components/ContactForm';
import { ContactList } from '../components/ContactList';
import { Filter } from '../components/Filter';


export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  useEffect(() => {
    dispatch(fetchContacts()); 
  }, [dispatch]);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />

      <h2>Contacts</h2>
      <Filter value={filter || ''} />

      {contacts && contacts.length > 0 ? (
        <ContactList />
      ) : (
        <p>No contacts available.</p>
      )}
    </div>
  );
};
