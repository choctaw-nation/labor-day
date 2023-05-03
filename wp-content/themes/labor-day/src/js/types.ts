export interface SortedEventsObject {
	friday: Array<LaborDayEvent>;
	saturday: Array<LaborDayEvent>;
	sunday: Array<LaborDayEvent>;
}
export interface LaborDayEvent {
	id: number;
	day: "Friday" | "Saturday" | "Sunday";
	title: string;
	description: string;
	start_time: string;
	end_time?: string;
	link: string;
}
