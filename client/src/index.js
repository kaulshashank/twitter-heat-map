import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import SearchBar from './components/search_bar';
import Map from './components/map_container';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div>
        <SearchBar  />
        <Map google={this.props.google} zoom={14} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
