var CACHE_NAME = 'cached_urls';
var urlsToCache = [
    'index.html',
    'assets/css/reset.css',
    'assets/css/screen.css',
    'assets/js/jquery-3.1.1.min.js',
    'assets/js/dice.js',
    'assets/js/DnD.js',
    'assets/js/DnDCharacter.js',
    'assets/js/DnDdata.js',
    'assets/js/localforage.js',
    'Pages/DnD.html',
    'pages/DnD_character_generator.html',
    'Pages/CoC.html',
    'Pages/GURPS.html'
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
                        console.log(response);
                        return response;
                    }

                    return fetch(event.request);
                }
            )
    );
});