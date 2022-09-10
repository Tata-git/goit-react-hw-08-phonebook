import { useState } from 'react';
import { useFetchContactsQuery, useAddContactMutation } from 'redux/contactApi';
import { nanoid } from 'nanoid';
import { Input, WrapperForm, Label, Button } from './ContactsForm.styled';

export function ContactsForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const { data } = useFetchContactsQuery();
  const [addContacts] = useAddContactMutation();

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    console.log(name, value);

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    const normalizedName = name.toLowerCase();

    const duplicate = data.find(
      item => item.name.toLowerCase() === normalizedName
    );

    if (duplicate) {
      alert(`${name} is already in contacts.`);
    } else {
      addContacts({ name, number, id: nanoid() });
    }
    reset();
  };

  return (
    <WrapperForm onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="name">Name</Label>
        <div>
          <Input
            onChange={handleChange}
            value={name}
            name="name"
            type="text"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            placeholder="Enter name"
          />
        </div>
        <div>
          <Label htmlFor="number">Number</Label>
          <div>
            <Input
              id={nanoid()}
              onChange={handleChange}
              value={number}
              name="number"
              type="tel"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              placeholder="Enter number"
            />
          </div>
        </div>
      </div>
      <Button type="submit">Add contact</Button>
    </WrapperForm>
  );
}
