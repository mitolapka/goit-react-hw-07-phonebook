import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, fetchContacts } from '../redux/contactsSlice';
import { selectContacts } from '../redux/selectors';
import { ContactItem } from '../components/ContactItem';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  return (
    <ul>
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          id={contact.id}
          name={contact.name}
          number={contact.phone}
          onDelete={() => handleDeleteContact(contact.id)}
        />
      ))}
    </ul>
  );
};
