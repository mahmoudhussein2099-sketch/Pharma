/* Self-destructing legacy service worker.
 *
 * Replaces any old CRA/workbox service worker registered at /service-worker.js.
 * The pre-upgrade app (create-react-app) registered a precache-first worker at
 * this URL; after the migration to Next.js that file no longer exists, so the
 * browser can never update it and keeps serving the old app shell forever.
 *
 * This worker:
 *   1. installs and activates immediately (skipWaiting),
 *   2. clears every cache it can find,
 *   3. unregisters every service worker registration on this origin,
 *   4. force-reloads all open tabs so the current build loads from the network.
 * It intentionally has no fetch handler, so once active every request goes
 * straight to the network.
 */
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      if (self.registration) {
        await self.registration.unregister().catch(() => {});
      }
      const clients = await self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
      });
      await Promise.all(
        clients.map((client) => client.navigate(client.url).catch(() => {}))
      );
    })()
  );
});
