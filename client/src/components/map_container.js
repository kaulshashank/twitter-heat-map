import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Map, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.loadMap = this.loadMap.bind(this);
  }
  componentWillReceiveProps(prevProps, prevState) {
    if (prevProps.bounds !== this.props.bounds) {
     this.loadMap();
    }
  }
  render() {
    return(
      <div className="embed-responsive embed-responsive-16by9">
        <Map ref="map" google={this.props.google} />
      </div>
    );
  }
  loadMap() {
    if(this.props) {
      const {google} = this.props;
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      const mapConfig = Object.assign({}, {
        center: {lat: 0, lng: 180},
        zoom: 2,
        gestureHandling: 'cooperative',
        mapTypeId: 'terrain'
      })
      var heatmapData = [];

      this.props.bounds.map((point) => {
        heatmapData.push(new google.maps.LatLng(point[1], point[0]));
      })
      //console.log(heatmapData);
      var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        radius: 20
      })

      this.map = new google.maps.Map(node, mapConfig);
      heatmap.setMap(this.map)
      heatmapData = [];
    }
  }
}

export default GoogleApiWrapper({
  apiKey: 'LOL',
  libraries: ['visualization']
})(MapContainer);
