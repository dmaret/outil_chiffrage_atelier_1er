// Service Worker — Outil Atelier La Pallanterie
// Stratégie : network-first pour la navigation (on récupère les updates
// quand en ligne), cache-first pour les assets statiques.
// Bumper CACHE_VERSION à chaque release pour invalider l'ancien cache.

const CACHE_VERSION = 'v2.1.3';
const CACHE_NAME = `atelier-lp-${CACHE_VERSION}`;
const APP_SHELL = [
    './',
    './index.html',
    './manifest.json'
];

// Install : pré-cache du shell
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(APP_SHELL))
            .then(() => self.skipWaiting())
    );
});

// Activate : nettoyage des anciens caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter((k) => k.startsWith('atelier-lp-') && k !== CACHE_NAME)
                    .map((k) => caches.delete(k))
            )
        ).then(() => self.clients.claim())
    );
});

// Fetch : stratégie adaptée selon le type de requête
self.addEventListener('fetch', (event) => {
    const req = event.request;

    // On ne gère que les GET même origine
    if (req.method !== 'GET') return;
    const url = new URL(req.url);
    if (url.origin !== self.location.origin) return;

    // Navigation / HTML : network-first, fallback cache
    const isNavigation = req.mode === 'navigate' ||
                         (req.headers.get('accept') || '').includes('text/html');

    if (isNavigation) {
        event.respondWith(
            fetch(req)
                .then((resp) => {
                    const copy = resp.clone();
                    caches.open(CACHE_NAME).then((c) => c.put(req, copy));
                    return resp;
                })
                .catch(() => caches.match(req).then((r) => r || caches.match('./index.html')))
        );
        return;
    }

    // Autres ressources : cache-first, fallback réseau
    event.respondWith(
        caches.match(req).then((cached) => {
            if (cached) return cached;
            return fetch(req).then((resp) => {
                if (resp.ok) {
                    const copy = resp.clone();
                    caches.open(CACHE_NAME).then((c) => c.put(req, copy));
                }
                return resp;
            }).catch(() => cached);
        })
    );
});
