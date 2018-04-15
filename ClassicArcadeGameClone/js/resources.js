/* Resources.js
 * This is simply an image loading utility. It eases the process of loading
 * image files so that they can be used within your game. It also includes
 * a simple "caching" layer so it will reuse cached images if you attempt
 * to load the same image multiple times.
 */

(function() {
  let resourceCache = {};
  let loading = [];
  let readyCallbacks = [];

  // Publicly accessible image loading function.
  // Takes an array of strings pointing to image files or a string for a single image.
  // Call private image loading function accordingly.
  function load(urlOrArr) {
    if(urlOrArr instanceof Array) {
      // Array of image given as argument
      urlOrArr.forEach(function(url) {
        _load(url);
      });
    } else {
      // String so image loader directly
      _load(urlOrArr);
    }
  }

  // Private image loader function called by the public image loader function.
  function _load(url) {
    if(resourceCache[url]) {
      // URL from resourceCache array instead of re-loading the image.
      return resourceCache[url];
    } else {
      // Image not in cache. Loading process.
      let img = new Image();
      img.onload = function() {
        // Add image to cache
        resourceCache[url] = img;

        // onReady() callbacks after image loaded and properly cached
        if(isReady()) {
          readyCallbacks.forEach(function(func) { func(); });
        }
      };

      // Initial cache value to false - Changed when image's onload event handler called
      // Image's src attribute pointed to the passed in URL.
      resourceCache[url] = false;
      img.src = url;
    }
  }

  // Obtain references to images previously loaded.
  function get(url) {
    return resourceCache[url];
  }

  // All images loaded check
  function isReady() {
    let ready = true;
    for(let k in resourceCache) {
      if(resourceCache.hasOwnProperty(k) &&
      !resourceCache[k]) {
        ready = false;
      }
    }
    return ready;
  }

  // Add function to the callback stack - After all requested images are properly loaded.
  function onReady(func) {
    readyCallbacks.push(func);
  }

  // Publicly accessible functions - Created by global Resources object.
  window.Resources = {
    load: load,
    get: get,
    onReady: onReady,
    isReady: isReady
  };
})();
