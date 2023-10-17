import React from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../redux/contactsSlice';
import { Label, Div, Button, DivName } from './MyForm.styled'
import { Formik, Form, Field, ErrorMessage } from 'formik';

export const ContactForm = () => {
    const dispatch = useDispatch();

    const validateName = value => {
        let errorMessage;
        if (!value) {
            errorMessage = 'Required';
        } else if (!/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/.test(value)) {
            errorMessage = 'Name may contain only letters, apostrophe, dash and spaces.';
        }
        return errorMessage;
    };

    const validateNumber = value => {
        let errorMessage;
        if (!value) {
            errorMessage = 'Required';
        } else if (!/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(value)) {
            errorMessage = 'Invalid phone number format XXX-XX-XX';
        }
        return errorMessage;
    };

    const handleFormSubmit = (values, { resetForm }) => {
        const newContact = {
          name: values.name,
          number: values.number,
        };
        dispatch(addContact(newContact))
          .then(() => {
            resetForm();
          });
    }

    return (
        
        <Formik
            initialValues={{ name: '', number: '' }}
            onSubmit={handleFormSubmit}
        >
            <Form>
                <DivName>
                    <Label htmlFor="name">Name:</Label>
                    <Field
                        type="text"
                        name="name"
                        id="name"
                        validate={validateName}
                    />
                    <ErrorMessage name="name" component="div" />
                </DivName>

                <Div>
                    <Label htmlFor="number">Phone Number:</Label>
                    <Field
                        type="tel"
                        name="number"
                        id="number"
                        validate={validateNumber}
                    />
                    <ErrorMessage name="number" component="div" />
                </Div>

                <Button type="submit">Add contact</Button>
            </Form>
        </Formik>
    );
};


