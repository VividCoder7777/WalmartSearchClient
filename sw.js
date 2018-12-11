importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
// test
workbox.clientsClaim();
workbox.precaching.precacheAndRoute([]);

workbox.precaching.suppressWarnings();
workbox.routing.registerRoute('https://walmartsearch.herokuapp.com/walmart/product/', workbox.strategies.cacheFirst());
workbox.routing.registerNavigationRoute('/index.html', {
	blacklist: [ /^\/_/, /\/[^\/]+\.[^\/]+$/ ]
});
