interface Filter {
	link: string;
	name: string;
}
type EventInfo = {
	description: string;
	info: {
		day: string;
		endTime: string;
		startTime: string;
	};
};
export interface EventType extends Filter {
	event_typeId: number;
}

export interface EventLocation extends Filter {
	event_locationId: number;
}

export type EventFilter = EventType | EventLocation;
export type EventFilters = {
	type: {
		name: string;
		filters: EventType[];
	};
};

/** The Structure of an Event Post Type */
export type EventPost = {
	eventLocations: {
		nodes: EventLocation[];
	};
	event_info: EventInfo;
	featuredImage: {
		node: {
			altText: string;
			mediaDetails: {
				sizes: [
					{
						height: string;
						name: string;
						width: string;
						sourceUrl: string;
					},
				];
			};
			srcSet: string;
			sizes: string;
		};
	};
	title: string;
	link: string;
	eventId: number;
	eventTypes: {
		nodes: EventType[];
	};
};
/** The Formatted Event Post Type Data */
export type PrettyEventData = {
	locations: EventLocation[];
	type: EventType[];
	sizes: string;
	eventId: number;
	link: string;
	title: string;
	event_info: EventInfo;
	altText: string;
	srcSet: string;
	size: {
		height: string;
		name: string;
		width: string;
		sourceUrl: string;
	};
};
[
	{
		eventLocations: {
			nodes: [
				{
					name: 'Field',
					link: 'http://labor-day.local/event_location/field/',
					event_locationId: 7,
				},
			],
		},
		event_info: {
			description:
				'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
			info: {
				day: 'Friday',
				endTime: '12:00 pm',
				startTime: '11:00 am',
			},
		},
		featuredImage: {
			node: {
				altText: '',
				mediaDetails: {
					sizes: [
						{
							height: '683',
							name: 'large',
							width: '1024',
							sourceUrl:
								'http://labor-day.local/wp-content/uploads/2023/04/R6_M2611-1024x683.jpg',
						},
					],
				},
				srcSet: 'http://labor-day.local/wp-content/uploads/2023/04/R6_M2611-1024x683.jpg 1024w, http://labor-day.local/wp-content/uploads/2023/04/R6_M2611-300x200.jpg 300w, http://labor-day.local/wp-content/uploads/2023/04/R6_M2611-768x512.jpg 768w, http://labor-day.local/wp-content/uploads/2023/04/R6_M2611.jpg 1080w',
				sizes: '(max-width: 1024px) 100vw, 1024px',
			},
		},
		title: 'Event #2',
		link: 'http://labor-day.local/events/event-2/',
		eventId: 97,
		eventTypes: {
			nodes: [
				{
					event_typeId: 5,
					name: 'Sports',
					link: 'http://labor-day.local/event_type/sports/',
				},
			],
		},
	},
	{
		eventLocations: {
			nodes: [
				{
					name: 'Ampitheatre',
					link: 'http://labor-day.local/event_location/ampitheatre/',
					event_locationId: 8,
				},
			],
		},
		event_info: {
			description:
				'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
			info: {
				day: 'Friday',
				endTime: null,
				startTime: '5:00 pm',
			},
		},
		featuredImage: {
			node: {
				altText: '',
				mediaDetails: {
					sizes: [
						{
							height: '683',
							name: 'large',
							width: '1024',
							sourceUrl:
								'http://labor-day.local/wp-content/uploads/2023/04/home-1024x683.jpg',
						},
					],
				},
				srcSet: 'http://labor-day.local/wp-content/uploads/2023/04/home-1024x683.jpg 1024w, http://labor-day.local/wp-content/uploads/2023/04/home-300x200.jpg 300w, http://labor-day.local/wp-content/uploads/2023/04/home-768x512.jpg 768w, http://labor-day.local/wp-content/uploads/2023/04/home-1536x1024.jpg 1536w, http://labor-day.local/wp-content/uploads/2023/04/home.jpg 1920w',
				sizes: '(max-width: 1024px) 100vw, 1024px',
			},
		},
		title: 'Act 6',
		link: 'http://labor-day.local/events/act-6/',
		eventId: 64,
		eventTypes: {
			nodes: [
				{
					event_typeId: 6,
					name: 'Entertainment',
					link: 'http://labor-day.local/event_type/entertainment/',
				},
			],
		},
	},
	{
		eventLocations: {
			nodes: [
				{
					name: 'Ampitheatre',
					link: 'http://labor-day.local/event_location/ampitheatre/',
					event_locationId: 8,
				},
			],
		},
		event_info: {
			description:
				'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
			info: {
				day: 'Sunday',
				endTime: null,
				startTime: '1:00 pm',
			},
		},
		featuredImage: {
			node: {
				altText: '',
				mediaDetails: {
					sizes: [
						{
							height: '683',
							name: 'large',
							width: '1024',
							sourceUrl:
								'http://labor-day.local/wp-content/uploads/2023/04/placeholder-1024x683.jpg',
						},
					],
				},
				srcSet: 'http://labor-day.local/wp-content/uploads/2023/04/placeholder-1024x683.jpg 1024w, http://labor-day.local/wp-content/uploads/2023/04/placeholder-300x200.jpg 300w, http://labor-day.local/wp-content/uploads/2023/04/placeholder-768x512.jpg 768w, http://labor-day.local/wp-content/uploads/2023/04/placeholder.jpg 1400w',
				sizes: '(max-width: 1024px) 100vw, 1024px',
			},
		},
		title: 'Act 5',
		link: 'http://labor-day.local/events/act-5/',
		eventId: 63,
		eventTypes: {
			nodes: [
				{
					event_typeId: 6,
					name: 'Entertainment',
					link: 'http://labor-day.local/event_type/entertainment/',
				},
			],
		},
	},
	{
		eventLocations: {
			nodes: [
				{
					name: 'Ampitheatre',
					link: 'http://labor-day.local/event_location/ampitheatre/',
					event_locationId: 8,
				},
			],
		},
		event_info: {
			description:
				'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
			info: {
				day: 'Saturday',
				endTime: null,
				startTime: '2:00 pm',
			},
		},
		featuredImage: {
			node: {
				altText: '',
				mediaDetails: {
					sizes: [
						{
							height: '683',
							name: 'large',
							width: '1024',
							sourceUrl:
								'http://labor-day.local/wp-content/uploads/2023/04/placeholder-1024x683.jpg',
						},
					],
				},
				srcSet: 'http://labor-day.local/wp-content/uploads/2023/04/placeholder-1024x683.jpg 1024w, http://labor-day.local/wp-content/uploads/2023/04/placeholder-300x200.jpg 300w, http://labor-day.local/wp-content/uploads/2023/04/placeholder-768x512.jpg 768w, http://labor-day.local/wp-content/uploads/2023/04/placeholder.jpg 1400w',
				sizes: '(max-width: 1024px) 100vw, 1024px',
			},
		},
		title: 'Act 4',
		link: 'http://labor-day.local/events/act-4/',
		eventId: 62,
		eventTypes: {
			nodes: [
				{
					event_typeId: 6,
					name: 'Entertainment',
					link: 'http://labor-day.local/event_type/entertainment/',
				},
			],
		},
	},
];
