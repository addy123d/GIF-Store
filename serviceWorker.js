const staticGIFStore = "gif-store-v1";
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/main.js"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticGIFStore).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});