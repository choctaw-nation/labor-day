// service-worker.js
if ('serviceWorker' in navigator) {
	window.addEventListener('load', function () {
		navigator.serviceWorker
			.register('service-worker.js')
			.then(function (registration) {
				console.log(
					'Service Worker registered with scope:',
					registration.scope
				);
			})
			.catch(function (error) {
				console.error('Service Worker registration failed:', error);
			});
	});
}
const distFileRoot = '/wp-content/themes/labor-day/dist';
// Cache the app shell files
const appShellFiles = [
	`${distFileRoot}/vendors.css`,
	`${distFileRoot}/global.css`,
	`${distFileRoot}/map.css`,
	`${distFileRoot}/frontPage.css`,
	`${distFileRoot}/mySchedule.css`,
	`${distFileRoot}/search.css`,
	`${distFileRoot}/fontawesome.js`,
	`${distFileRoot}/vendors.js`,
	`${distFileRoot}/global.js`,
	`${distFileRoot}/map.js`,
	`${distFileRoot}/frontPage.js`,
	`${distFileRoot}/mySchedule.js`,
	`${distFileRoot}/search.js`,
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
