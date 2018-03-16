var CACHE_NAME = 'cached_urls';
var urlsToCache = [
    'index.html',
    'assets/css/reset.css',
    'assets/css/screen.css',
    'assets/js/script.js'
];
self.addEventListener('install', function (event) {
    event.waitUntil(caches.open(CACHE_NAME)
        .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
    }));
});