declare global {
	interface Window {
		cnoSiteData: {
			rootUrl: string;
			laborDayDates: {
				friday: string;
				saturday: string;
				sunday: string;
			};
		};
	}
}

export {};
