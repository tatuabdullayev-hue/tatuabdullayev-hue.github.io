// Retires the old DoriYordam service worker: clears its cache, unregisters, and sends open pages to MediScan AI.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.map(k => caches.delete(k))))
    .then(() => self.registration.unregister())
    .then(() => self.clients.matchAll({ type: "window" }))
    .then(clients => clients.forEach(c => c.navigate("/mediscan-ai/"))));
});
