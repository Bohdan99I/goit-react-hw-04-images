import PropTypes from 'prop-types';

import { Component } from 'react';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  StyledBiSearchAlt,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    value: '',
  };

  onChange = event => {
    this.setState({ value: event.currentTarget.value.trim().toLowerCase() });
  };

  onSubmit = event => {
    event.preventDefault();    
    if (this.state.value) {}
    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
    event.currentTarget.reset();
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.onSubmit}>
          <SearchFormButton type="submit">
            <StyledBiSearchAlt />
          </SearchFormButton>
          <SearchFormInput
            name="search"
            type="text"
            onChange={this.onChange}
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
