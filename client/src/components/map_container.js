import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Map, GoogleApiWrapper} from 'google-maps-react';

{MAP_API_KEY} from '../index.js';

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
      <div className="mapdiv embed-responsive embed-responsive-16by9">
        <Map ref="map" google={this.props.google} />
      </div>
    );
  }
  loadMap() {
    if(this.props) {
      //console.log(this.props);
      const {google} = this.props;
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      const mapConfig = Object.assign({}, {
        center: new google.maps.LatLng(0, 0),
	      zoom: 3,
	      minZoom: 2,
        mapTypeId: 'satellite'
      })
      var heatmapData = [];
      var markers = [];
      this.props.bounds.map((point) => {
        heatmapData.push(new google.maps.LatLng(point[0], point[1]));
        markers.push({lat: point[0], lng: point[1]});
      })
      //console.log(heatmapData);
      var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        radius: 10
      })

      this.map = new google.maps.Map(node, mapConfig);
      // markers.forEach(marker => {
      //   new google.maps.Marker({
      //     position: marker,
      //     map: this.map,
      //     title: "test"
      //   }).setMap(this.map);
      // });
      heatmap.setMap(this.map);
    }
  }
}

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

export default GoogleApiWrapper({
  apiKey: MAP_API_KEY,
  libraries: ['visualization']
})(MapContainer);
