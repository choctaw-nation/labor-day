// service-worker.js
if ('serviceWorker' in navigator) {
	window.addEventListener('load', function () {
		navigator.serviceWorker.getRegistration().then((registration) => {
			if (registration) {
				registration
					.unregister()
					.then(() => {
						console.log('Service worker unregistered');
					})
					.catch((error) => {
						console.error(
							'Failed to unregister service worker:',
							error
						);
					});
			}
		});

		// 	navigator.serviceWorker
		// 		.register('service-worker.js')
		// 		.then(function (registration) {
		// 			console.log(
		// 				'Service Worker registered with scope:',
		// 				registration.scope
		// 			);
		// 		})
		// 		.catch(function (error) {
		// 			console.error('Service Worker registration failed:', error);
		// 		});
	});
}
const distFileRoot = '/wp-content/themes/labor-day/dist';
// Cache the app shell files
const appShellFiles = [
	`${distFileRoot}/vendors/vendors.css`,
	`${distFileRoot}/vendors/bootstrap.js`,
	`${distFileRoot}/vendors/fontawesome.js`,
	`${distFileRoot}/frontPage.css`,
	`${distFileRoot}/frontPage.js`,
	`${distFileRoot}/global.css`,
	`${distFileRoot}/global.js`,
	`${distFileRoot}/map.css`,
	`${distFileRoot}/map.js`,
	`${distFileRoot}/mySchedule.css`,
	`${distFileRoot}/mySchedule.js`,
	`${distFileRoot}/search.css`,
	`${distFileRoot}/search.js`,
	`${distFileRoot}/singleEvents.js`,
];

// Install service worker and cache app shell files
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open('app-shell-cache').then((cache) => {
			return cache.addAll(appShellFiles);
		})
	);
});

// Serve cached app shell files when offline
self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request);
		})
	);
});
