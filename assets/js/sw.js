var CACHE_NAME = 'cached_urls';
var urlsToCache = [
    '../../index.html',
    '../css/reset.css',
    '../css/screen.css',
    '../js/script.js'
];
self.addEventListener('install', function (event) {
    event.waitUntil(caches.open(CACHE_NAME)
        .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
    }));
});