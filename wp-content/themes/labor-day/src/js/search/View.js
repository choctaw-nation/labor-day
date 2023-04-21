export default new (class View {
	constructor() {}
	/** Updates the visibility of the filters */
	setShowFilters() {
		const filtersContainer = document.querySelector(
			'.cno-event-search-filters',
		);
		filtersContainer.classList.toggle('hide');
	}
	/**
	 *
	 * @param {HTMLElement} button the toggle
	 * @param {boolean} showFilters the filters' visibility (aka state)
	 */
	updateButtonText(button, showFilters) {
		button.innerText =
			true === showFilters ? 'Hide Filters' : 'Show Filters';
	}
	theMarkup(data) {
		const {
			location,
			eventId,
			slug,
			title,
			event_info,
			altText,
			srcSet,
			size,
			sizes,
			type,
		} = data;

		return `
	<article class="cno-event">
		<figure class="cno-event__image">
			<img width="${size.width}" height="${
			size.height
		}" src="" class="attachment-large size-large wp-post-image" alt="${altText}" decoding="async" srcset="${srcSet}" sizes="${sizes}">	</figure>
		<h2>${title}</h2>
		<aside class="event-meta">
			<div class="event-meta__day">
					<strong>When: </strong>${event_info.info.day}, September 1
			</div>
			<div class="event-meta__location">
				<strong>Where:</strong> <a href="${location[0].link}" rel="tag">${
			location[0].name
		}</a>
			</div>
			<div class="event-meta__start-time">
				<strong>Start Time:</strong> ${event_info.info.startTime}
			</div>
			${
				event_info.info.endTime
					? `<div class="event-meta__end-time"><strong>End Time:</strong> ${event_info.info.endTime}</div>`
					: ''
			}
			<div class="event-meta__type">
				<strong>Event Type:</strong> <a href="${type[0].link}" rel="tag">${
			type[0].name
		}</a>
			</div>
		</aside>
		<div class="about">${event_info.description}</div>
		<div class="cno-event__buttons">
			<button class="btn__fill--primary" data-add-to-schedule="true" data-id="${eventId}">Add to Schedule</button>
			<a href="/events/${slug}/" class="btn__outline--primary">Learn More</a>
			<div class="cno-event-schedule-confirmation"></div>
		</div>
	</article>
`;
	}
	destructureData(data) {
		const {
			eventLocations: { nodes: location },
		} = data;
		const {
			eventTypes: { nodes: type },
		} = data;
		const { eventId, slug, title } = data;
		const { event_info } = data;
		const {
			featuredImage: {
				node: { altText, srcSet, mediaDetails, sizes },
			},
		} = data;
		const size = mediaDetails.sizes[0];

		return {
			location,
			type,
			sizes,
			eventId,
			slug,
			title,
			event_info,
			altText,
			srcSet,
			size,
		};
	}
	showResults(data) {
		console.log(data);
		const resultsContainer = document.getElementById('results');
		resultsContainer.innerHTML = '';
		data.events.edges.forEach(({ node }) => {
			resultsContainer.insertAdjacentHTML(
				'beforeend',
				this.theMarkup(this.destructureData(node)),
			);
		});
	}
})();
