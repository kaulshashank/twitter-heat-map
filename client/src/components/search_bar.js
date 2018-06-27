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
            className ="form-control"
            name="hash_tag"
            placeholder='Enter a hashtag (Common hashtags with geolocation include #traffic, #beach, etc...)'
          />
          <button className="btn btn-primary btn-round">Search</button>
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
