import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import SearchBar from './components/search_bar';
import MapComponent from './components/map_container';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bounds: []
    };
    this.Search = this.Search.bind(this);
  }
  render() {
    return(
      <div>
        <SearchBar onSearchSubmit={(tag) => {this.Search(tag)}} />
        <MapComponent
          google={this.props.google}
          bounds={this.state.bounds}
        />
      </div>
    )
  }
  Search(hashtag) {
    axios.post('http://localhost:1337/twitter', {tag: hashtag})
    .then((response) => {
      this.state.bounds.length = 0;
      response.data.map((res) => {
        this.setState({
          bounds: [...this.state.bounds, res]
        });
      });
    })
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
