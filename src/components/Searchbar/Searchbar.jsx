import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  StyledBiSearchAlt,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const onChange = event => {
    setValue(event.currentTarget.value.trim().toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(value);
    setValue('');
    
    event.currentTarget.reset();
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <StyledBiSearchAlt />
        </SearchFormButton>
        <SearchFormInput
          name="search"
          type="text"
          onChange={onChange}
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
