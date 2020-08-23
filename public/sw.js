
var CACHE_NAME = 'quiz-app-cache-v1';

var urlsToCache = [
  '/sockjs-node',
  '/static/js/bundle.js',
  '/static/js/1.chunk.js',
  '/static/js/main.chunk.js',
  '/main.7a56764f38e1892a402f.hot-update.js',
  '/offline.html',
  "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple",
  "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple",
  "https://opentdb.com/api.php?amount=10&category=9&difficulty=hard&type=multiple",
  "https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple",
  "https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple",
  "https://opentdb.com/api.php?amount=10&category=11&difficulty=hard&type=multiple",
  "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple",
  "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple",
  "https://opentdb.com/api.php?amount=10&category=18&difficulty=hard&type=multiple",
  "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple",
  "https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple",
  "https://opentdb.com/api.php?amount=10&category=21&difficulty=hard&type=multiple",
  "https://opentdb.com/api.php?amount=10&category=23&difficulty=easy&type=multiple",
  "https://opentdb.com/api.php?amount=10&category=23&difficulty=medium&type=multiple",
  "https://opentdb.com/api.php?amount=10&category=23&difficulty=hard&type=multiple",
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      }).catch((err)=>{console.log('error:',err);})
  );
});

const options = {
  ignoreSearch: true,
  ignoreMethod: true,
  ignoreVary: true
};

  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request,options)
        .then(function(response) {
          if (response) {
            return response;
          }
  
          return fetch(event.request).then(
            function(response) {
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              var responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });
              return response;
            }
          ).catch(()=>caches.match('/offline.html'));
        })
      );
  });