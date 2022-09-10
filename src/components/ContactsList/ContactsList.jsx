import { useSelector } from 'react-redux';
import {
  useFetchContactsQuery,
  useDeleteContactMutation,
  getFilterValue,
} from 'redux/contactApi';
import { ContactList, Item, Contact, Button } from './ContactList.styled';

export const ContactsList = () => {
  const { data: items, isLoading } = useFetchContactsQuery();
  //   const re = useFetchContactsQuery();
  // console.log('useFetchContactsQuery:', re)

  const filter = useSelector(getFilterValue);

  const [deleteContact] = useDeleteContactMutation();
  //------------ filter ------------------------
  const findQuery =
    !isLoading &&
    items.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  const findContacts = filter ? findQuery : items;
  //------------- delete -------------------
  const handleDeleteContact = contactId => {
    console.log(contactId);

    deleteContact(contactId);
  };

  return (
    <ContactList>
      {!isLoading &&
        findContacts.map(({ id, name, number }) => (
          <Item key={id}>
            <Contact>{name}: </Contact>
            <Contact>{number} </Contact>
            <Button type="button" onClick={() => handleDeleteContact(id)}>
              Delete
            </Button>
          </Item>
        ))}
    </ContactList>
  );
};
