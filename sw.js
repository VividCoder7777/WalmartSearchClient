importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');
// test
workbox.precaching.precacheAndRoute([]);

workbox.precaching.suppressWarnings();
workbox.routing.registerRoute('https://walmartsearch.herokuapp.com/walmart/product/', workbox.strategies.cacheFirst());
workbox.routing.registerNavigationRoute('/index.html', {
	blacklist: [ /^\/_/, /\/[^\/]+\.[^\/]+$/ ]
});
