import invariant from 'invariant';

export const GoogleApi = function(opts) {
  opts = opts || {};

  invariant(opts.hasOwnProperty('apiKey'), 'API Key required to use Google API');

  const apiKey = opts.apiKey, libraries = opts.libraries || ['places'], client = opts.client, URL = 'https://maps.googleapis.com/maps/api/js', googleVersion = opts.version || '3';

  let channel = null, language = opts.language, region = null;

  const url = () => {
    let url = URL, params = {
      key: apiKey,
      callback: 'window.loadMap.resolve',
      libraries: libraries.join(','),
      client: client,
      v: googleVersion,
      channel: channel,
      language: language,
      region: region
    };

    let paramStr = Object.keys(params).filter(k => !!params[k]).map(k => `${k}=${params[k]}`).join('&');

    return `${url}?${paramStr}`;
  };

  return url();
};

export default GoogleApi
