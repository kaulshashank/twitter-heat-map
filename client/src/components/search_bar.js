import React , { Component } from 'react';
import axios from 'axios';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }
  render() {
    return (
      <div className="search-bar">
        <form onSubmit={this.submitForm}>
          <input
            name="hash_tag"
            placeholder='Enter a hash tag...'
          />
          <button className="btn-primary"> submit </button>
        </form>
      </div>
    );
  }

  submitForm(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    this.props.onSearchSubmit(data.get('hash_tag'));
  }
}



export default SearchBar;
