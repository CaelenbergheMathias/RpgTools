var CACHE_NAME = 'cached_urls';
var urlsToCache = [
    'RpgTools/index.html',
    'RpgTools/assets/css/reset.css',
    'RpgTools/assets/css/screen.css'
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