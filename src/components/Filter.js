import { Label, Div} from './MyForm.styled'
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/contactsSlice';
import {selectFilter} from '../redux/selectors'

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleFilterChange = event => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <Div>
      <Label htmlFor="filter">Search by name:</Label>
      <input
        type="text"
        name="filter"
        id="filter"
        value={filter}
        onChange={handleFilterChange}
      />
    </Div>
  );
};
