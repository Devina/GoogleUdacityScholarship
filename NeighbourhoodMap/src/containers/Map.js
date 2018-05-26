import React, { Component } from 'react';
import ReactDOM from 'react-dom';


export default class Map extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.google !== this.props.google) this.loadMap();
  }

  componentDidMount() {
    this.loadMap();
  }

  loadMap(){
    if (this.props && this.props.google) {
      const {google} = this.props, maps = google.maps, mapRef = this.refs.map, center = new maps.LatLng(51.5086801, -0.1329533), zoom = 10, mapConfig = Object.assign({}, {center, zoom,}), node = ReactDOM.findDOMNode(mapRef);
      this.map = new maps.Map(node, mapConfig);
      this.props.isLoaded(this.map);
    }
  }

  render() {
    return (
      <div ref='map' className={'map'}>
        { this.props.error ? (<p className={"map-message"}>Failed to Load Google Maps</p>) : (<p className={"map-message"}>Loading Google Maps...</p>) }
      </div>
    )
  }
}
