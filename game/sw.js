// Service worker — cachea la app para que funcione offline.
// Nota: los service workers SOLO funcionan sobre http(s) o localhost, no con file://.
// Versión: incrementá este número cuando hagas cambios en archivos para forzar recarga del caché.
const CACHE = "s5-game-v2";
const ASSETS = [
  "./", "./index.html", "./styles.css",
  "./data.js", "./conversations.js", "./store.js", "./app.js",
  "./manifest.webmanifest", "./icon.svg",
  // Nota: localStorage siempre lee fresh, no es cacheado por SW.
  // Cambios en estos archivos invalidan el caché anterior automáticamente.
];

self.addEventListener("install", (e) => {
  // Cachea todos los ASSETS en la primera instalación (o cuando el SW cambia).
  // skipWaiting() permite actualizar incluso si hay SW antiguo activo.
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  // Limpia cachés antiguos cuando el SW se activa (después de actualizar CACHE version).
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  // Cache-first: usa caché si existe, sino carga de red y cachea.
  // Fallback a index.html si está offline.
  // Para actualizar: incrementá CACHE version y recarga (Shift+Reload).
  e.respondWith(
    caches.match(req).then((hit) =>
      hit || fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
        return res;
      }).catch(() => caches.match("./index.html"))
    )
  );
});
