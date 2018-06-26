import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Map, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.loadMap = this.loadMap.bind(this)
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google || prevProps.quakes !== this.props.quakes) {
      this.loadMap();
    }
  }
  render() {
    return(
      <div className="embed-responsive embed-responsive-16by9">
        <Map
          google={window.google}
          zoom={3}
        />
      </div>
    );
  }
  loadMap() {
    
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB9jczIiGXLjxzsDJkuzGb_d1EZyiRt7K4',
  libraries: ['visualization']
})(MapContainer);
