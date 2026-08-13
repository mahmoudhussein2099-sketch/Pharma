/* Awon Pharmacy service worker
 * - Network-first for API calls (fresh data).
 * - Cache-first for static assets (fonts, images, icons) with runtime caching.
 * - App-shell fallback for offline navigation.
 */
const VERSION = 'awon-v4';
const SHELL_CACHE = `${VERSION}-shell`;
const STATIC_CACHE = `${VERSION}-static`;
const SHELL_URLS = ['/', '/manifest.json', '/offline.html'];
const CORE_ASSETS = ['/logo192.png', '/logo512.png', '/icons/icon-192.png', '/icons/icon-512.png', '/icons/maskable-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL_URLS)),
      caches.open(STATIC_CACHE).then((cache) => cache.addAll(CORE_ASSETS)),
    ]).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll({ type: 'window', includeUncontrolled: true }))
      .then((clients) =>
        Promise.all(
          clients.map((client) => client.navigate(client.url).catch(() => {}))
        )
      )
  );
});

const isApi = (url) => url.pathname.startsWith('/api/');

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // API: network-first, fall back to stale cache for resilience.
  if (isApi(url)) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(STATIC_CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Navigation: network-first with offline shell fallback.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(SHELL_CACHE).then((cache) => cache.put('/offline.html', copy));
          return response;
        })
        .catch(() => caches.match('/offline.html').then((cached) => cached || caches.match('/')))
    );
    return;
  }

  // Static assets: cache-first, then network and cache.
  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ||
        fetch(request).then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
    )
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
