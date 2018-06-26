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
        {this.state.bounds.join(' ')}
      </div>
    )
  }
  Search(hashtag) {
    axios({
      method: 'POST',
      url: 'http://localhost:1337/twitter',
      params: {
        tag: hashtag
      }
    }).then((response) => {
      if(this.state.bounds) {
        this.setState({
          bounds: []
        })
      }
      response.data.map((res) => res.map((r) => r.map((subr)=> {
        this.setState({
          bounds: [...this.state.bounds, subr]
        });
      })))
    })
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
