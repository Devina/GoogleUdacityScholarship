const currentStaticCacheName = 'restaurant-static-v1';
const urlsToCache = [
  "/",
  "/index.html",
  "/restaurant.html",
  "/js/main.js",
  "/js/restaurant_info.js",
  "/js/dbhelper.js",
  "/data/restaurants.json",
  "/css/styles.css",
  "/img/1.jpg",
  "/img/2.jpg",
  "/img/3.jpg",
  "/img/4.jpg",
  "/img/5.jpg",
  "/img/6.jpg",
  "/img/7.jpg",
  "/img/8.jpg",
  "/img/9.jpg",
  "/img/10.jpg"
];

/**
 * Install service worker
 */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(currentStaticCacheName).then(cache => cache.addAll(urlsToCache))
  );
});

/**
 * Cache and return requests (Get resources from the cache if already present)
 */
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  event.respondWith(
    caches.open(currentStaticCacheName).then(cache => cache.match(event.request).then(response => response || fetch(event.request).then(response => {
      cache.put(event.request, response.clone());
      return response;
    })))
  );
  return;
});

/**
 * Update service worker
 */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.filter(cacheName => cacheName.startsWith('restaurant-') && cacheName != currentStaticCacheName).map(cacheName => caches.delete(cacheName))
    ))
  );
});
