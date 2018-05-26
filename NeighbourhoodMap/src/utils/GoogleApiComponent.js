import React, { Component } from 'react';
import GoogleApi from './GoogleApi';


const loadMap = (apiKey,libraries) => {
  const defer = {};
  defer.error = null;
  defer.promise = new Promise((resolve,reject) => {
    let body = document.getElementsByTagName('body')[0], tag = document.createElement('script');
    const src = GoogleApi({
      apiKey: apiKey,
      libraries: libraries
    })
    tag.src = src;
    tag.async = true;
    tag.onerror = reject;
    defer.resolve = resolve;
    defer.reject = reject;
    body.appendChild(tag);
  });

  return defer;
}

export const wrapper = (options) => (WrappedComponent) => {
  const apiKey = options.apiKey, libraries = options.libraries || ['places'];

  class Wrapper extends Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        loaded: false,
        google: null
      };
    }

    componentDidMount() {
      window.loadMap =  loadMap(apiKey,libraries);
      window.loadMap.promise
      .then(() => {
        this.setState({
          loaded: true,
          google: window.google,
          error: null
        });
      })
      .catch(error => {
        this.setState({
          loaded: false,
          google: window.google,
          error: error
        });
      });
    }

    render() {
      const props = Object.assign({}, this.props, {
        loaded: this.state.loaded,
        google: this.state.google,
        error: this.state.error
      });

      return (
        <div>
          <WrappedComponent {...props} />
          <div ref='map' />
        </div>
      );
    }
  }

  return Wrapper;
};

export default wrapper;
