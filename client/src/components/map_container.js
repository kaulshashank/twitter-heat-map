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
	      zoom: 2,
	      minZoom: 2,
        mapTypeId: 'terrain'
      })
      var heatmapData = [];

      this.props.bounds.map((point) => {
        heatmapData.push(new google.maps.LatLng(point[0], point[1]));
      })
      //console.log(heatmapData);
      var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        radius: 20
      })

      this.map = new google.maps.Map(node, mapConfig);
      heatmap.setMap(this.map)
    }
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB9jczIiGXLjxzsDJkuzGb_d1EZyiRt7K4',
  libraries: ['visualization']
})(MapContainer);
