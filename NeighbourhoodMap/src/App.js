import React, { Component } from 'react';
import Navbar from './containers/Navbar';
import Sidebar from './containers/Sidebar';
import Map from './containers/Map';
import GoogleApiComponent from './utils/GoogleApiComponent';
import locations from './components/locations';
import './App.css';

class App extends Component {
  state = {
    locations,
    google: this.props.google,
    loaded: false,
    map: null,
  };

  load = (map) => {
    this.setState({
      loaded: true,
      map
    });
  };

  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    };

    return (
      <main className="App">
        <Navbar/>
        <Sidebar map={this.state.map} locations={locations} google={this.props.google}/>
        <div style={style} role={'application'}>
          <Map google={this.props.google} isLoaded={this.load} error={this.props.error}/>
        </div>
      </main>
    );
  }
}

export default GoogleApiComponent({
  apiKey: 'AIzaSyCEZdmnqqukHejc6lTI8k2qx7Lj4Q5OpLA'
})(App);
