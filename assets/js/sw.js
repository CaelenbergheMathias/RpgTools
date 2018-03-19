var CACHE_NAME = 'cached_urls';
var urlsToCache = [
    '../../index.html',
    '../css/reset.css',
    '../css/screen.css',
    'dice.js',
    'script.js',
    '../../Pages/DnD.html',
    '../../Pages/DnD_character_generator.html'
];
self.addEventListener('install', function (event) {
    event.waitUntil(caches.open(CACHE_NAME)
        .then(function (cache) {
        console.log('Opened cache');
        console.log(urlsToCache);
        return cache.addAll(urlsToCache);
    }));
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                    // Cache hit - return response
                    if (response) {
                        return response;
                    }

                    return fetch(event.request);
                }
            )
    );
});