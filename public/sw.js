const CACHE_NAME = "hetul-portfolio-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/favicon.svg",
  "/192x192-logo.webp",
  "/512x512-logo.webp",
  "/manifest.json",
  "/icons.svg",
  "/robots.txt",
  "/430x932-screenshot.webp",
  "/1920x1080-screenshot.webp",
  "/og-image.webp",
  "/fonts/Inter-VariableFont_opsz,wght.woff2",
  "/fonts/Inter-Italic-VariableFont_opsz,wght.woff2",
  "/fonts/SpaceGrotesk-VariableFont_wght.woff2",
];

// Install event - cache core assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }),
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        }),
      );
    }),
  );
  self.clients.claim();
});

// Fetch event - stale-while-revalidate pattern
self.addEventListener("fetch", (event) => {
  // Only handle GET requests and local/same-origin requests
  if (
    event.request.method !== "GET" ||
    !event.request.url.startsWith(self.location.origin)
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch fresh in background to update cache
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse);
              });
            }
          })
          .catch(() => {
            // Ignore network errors in background
          });
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            networkResponse.type !== "basic"
          ) {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        })
        .catch(() => {
          // If offline and requesting document, return the home shell
          if (event.request.headers.get("accept")?.includes("text/html")) {
            return caches.match("/");
          }
        });
    }),
  );
});
