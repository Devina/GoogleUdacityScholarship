import React, { Component } from 'react';

export default class Marker extends Component {
  componentDidMount(){
    this.renderMarker();

    fetch(
      `https://api.foursquare.com/v2/venues/${ this.props.loc.fsid }?client_id=ZC1SEBWXRYU5L0XTQREQKTC2L4WX151ZUHF0ONYE1LO0KJAV&client_secret=Q5H3DX0G4NIIEEC0VLREFKFFO3UVUITHJVYHL44IDA4EK5Y3&v=20180525`, {
        'Accept' : 'application/json'
    })
    .then(res => res.json())
    .then(res => res.response.venue)
    .then(res => {
      if(res.hasOwnProperty('rating')) this.marker.rating = res.rating;
      else this.marker.rating = "Rating Unavailable";
      if(res.hasOwnProperty('shortUrl')) this.marker.url = res.shortUrl;
      else this.marker.url = "URL Unavailable";
      })
    .catch(() => { this.marker.rating = "Error"});
  }

  componentWillUnmount(){
    this.marker.setMap(null);
  }

  renderMarker = () => {
    if (this.props && this.props.google) {
      let { map, google, loc } = this.props;

      const position = new google.maps.LatLng(loc.lat, loc.lng), pref = {
        map: map,
        position: position,
        name: loc.name,
        animation: google.maps.Animation.DROP
      };

      this.marker = new google.maps.Marker(pref);
      this.marker.addListener('click',this.selectMarker);
    }
  }

  selectMarker = () => {
    this.marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
    setTimeout(() => { this.marker.setAnimation(null) }, 900);
    this.props.changeSelected(this.marker);
    this.props.onClk();
  }

  keyPress = e => {
    if(e.key === 'Enter') this.selectMarker();
  }

  render() {
    return (
      <a tabIndex="0" role={'button'} onClick={this.selectMarker} onKeyPress={this.selectMarker} className="menu-item">
        { this.props.loc.name }
      </a>
    );
  }
}
