import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { viewContact, getFilterValue } from 'redux/contactApi';
import { Input, Label } from './Filter.styled';

export const Filter = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(getFilterValue);

  const handleChange = e => {
    const { value } = e.currentTarget;
    dispatch(viewContact(value));
  };

  return (
    <div>
      <Label htmlFor="name">Find contacts by name</Label>
      <div>
        <Input
          id={nanoid()}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          placeholder="Contact search"
          value={filterValue}
          onChange={handleChange}
          // onChange={e => {
          //   dispatch(viewContact(e.target.value));
          // }}
        />
      </div>
    </div>
  );
};

// Filter.propTypes = {
//   onChange: PropTypes.func.isRequired,
//   value: PropTypes.string.isRequired,
// };
