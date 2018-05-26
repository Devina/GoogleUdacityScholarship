import { Component } from 'react';

export default class MarkerInfoWindow extends Component {
  componentDidMount() {
    this.markerInfoWindow = new this.props.google.maps.InfoWindow();
    this.openWindow();
  }

  componentDidUpdate(prevProps){
    if (prevProps.marker !== this.props.marker) {
      this.closeWindow();
      this.openWindow();
    }
  }

  openWindow() {
    if (this.props.marker) {
      this.markerInfoWindow.setContent(`
        <div role={'textbox'}>
          <h3> ${this.props.marker.name} </h3>
          ${this.props.marker.rating !== 'Error' ? `<p> Rating: ${this.props.marker.rating}/10</p>` : `<p>Error in fetching information from API</p>`}
          ${this.props.marker.url ? `<a href="${this.props.marker.url}" target="_blank">Read More</a>` : ``}
        </div>
      `);
      this.markerInfoWindow.open(this.props.map, this.props.marker);
    }
  }

  closeWindow() {
    this.markerInfoWindow.close();
  }

  render(){
    return null;
  }
}
