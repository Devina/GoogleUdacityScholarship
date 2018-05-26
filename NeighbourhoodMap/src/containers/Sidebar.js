import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import FocusLock from "react-focus-lock";
import Marker from '../components/Marker';
import MarkerInfoWindow from '../components/MarkerInfoWindow';

export default class Sidebar extends Component {
  state = {
    selectedMarker: null,
    menuOpen: false,
    query: ""
  };

  changeMarker =  (marker) => {
    this.setState({ selectedMarker: null });
    this.setState({ selectedMarker: marker });
  }

  handleStateChange = (state) => {
    this.setState({ menuOpen: state.isOpen });
  }

  closeMenu = () => {
    this.setState({ menuOpen: false });
  }

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  handleQueryChange = (event) => {
    const query= event.target.value;
    this.setState({ query, selectedMarker: null });
  }

  render () {
    let { locations } = this.props;
    const { query } = this.state;
    locations = query.trim() === "" ? locations : locations.filter(loc => loc.name.toLowerCase().indexOf(query.toLowerCase()) >= 0);
    return (
      <FocusLock disabled={!this.state.menuOpen} allowTextSelection={true}>
        <Menu isOpen={this.state.menuOpen} onStateChange={(state) => this.handleStateChange(state)} role={'menu'}>
          <div className="form-group">
            <input id="search" type="text" value={this.state.query} onChange={this.handleQueryChange}/>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label htmlFor="search">Quick Search</label>
          </div>
          { this.props.map && locations.map(loc => <Marker loc={loc} map = {this.props.map} google = {this.props.google} key = {loc.fsid} changeSelected = {this.changeMarker} onClk={() => this.closeMenu()}/> ) }
          { this.props.map && <MarkerInfoWindow marker = {this.state.selectedMarker} map = {this.props.map} google = {this.props.google} /> }
        </Menu>
      </FocusLock>
    );
  }
}
