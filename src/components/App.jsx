import { ContactsForm } from './ContactsForm/ContactsForm';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';

import { Title, Wrapper } from './App.styled';

export function App() {
  return (
    <Wrapper>
      <Title>Phonebook</Title>
      <ContactsForm />

      <Title>Contacts</Title>
      <Filter />
      <ContactsList />
    </Wrapper>
  );
}
