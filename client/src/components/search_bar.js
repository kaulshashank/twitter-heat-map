import React , { Component } from 'react';
import axios from 'axios';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ' '
    };
    this.Search = this.Search.bind(this);
  }
  render() {
    return (
      <div className="search-bar">
        <form onSubmit={this.Search}>
          <input
            name="hash_tag"
            placeholder='Enter a hash tag...'
          />
          <button className="btn-primary"> submit </button>
        </form>
      </div>
    );
  }
  Search(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    axios({
      method: 'POST',
      url: 'http://localhost:1337/twitter',
      params: {
        tag: data.get('hash_tag')
      }
    }).then((response) => {
      console.log(response);
    })
  }
}



export default SearchBar;
