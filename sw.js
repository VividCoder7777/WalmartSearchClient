importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
	// define the strategy to use
	const walmart_product_strategy = workbox.strategies.networkFirst({
		cacheName: 'product-runtime-cache',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 30,
				maxAgeSecond: 60 * 60 * 5
			})
		]
	});

	workbox.clientsClaim();
	workbox.precaching.precacheAndRoute([]);

	workbox.precaching.suppressWarnings();

	workbox.routing.registerRoute(
		new RegExp('https://walmartsearch.herokuapp.com/walmart/product/.*'),
		async (args) => {
			try {
				let response = await walmart_product_strategy.handle(args);

				if (!response) {
					// no network access and nothing in cache
					return await caches.match('./fallback_product.json');
				}
				return response;
			} catch (error) {
				console.log('an error has occurred!');
			}
		}
	);

	workbox.routing.registerNavigationRoute('/index.html', {
		blacklist: [ /^\/_/, /\/[^\/]+\.[^\/]+$/ ]
	});

	// need to change to networkFirst
	// have a error handler to return a fallback data message
	// customize precache?
}
