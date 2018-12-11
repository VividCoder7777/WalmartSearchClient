importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

importScripts('/precache-manifest.e30e6b5759aed6ad57d266165ae00f97.js');

workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */

let apiURL = '';

if (process.env.NODE_ENV === 'development') {
	apiURL = process.env.REACT_APP_DEV_ENV;
} else {
	apiURL = process.env.REACT_APP_PROD_ENV;
}

console.log('FROM THE SERVICE WORKER', apiURL);
// test
workbox.precaching.precacheAndRoute([]);

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
workbox.routing.registerRoute(new RegExp(apiURL), workbox.strategies.cacheFirst());
workbox.routing.registerNavigationRoute('/index.html', {
	blacklist: [ /^\/_/, /\/[^\/]+\.[^\/]+$/ ]
});
