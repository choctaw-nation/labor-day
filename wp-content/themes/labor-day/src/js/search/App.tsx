import React, { useState, useEffect, createRoot } from '@wordpress/element';
import LoadingSpinner from '../spinner';
import Model from './Model';
import SearchBar from './SearchBar';
import ResultsContainer from './ResultsContainer';
import { EventFilter, EventFilters, EventPost } from './types';
declare const cnoSiteData: {
	rootUrl: string;
	postsPerPage: string;
};

export const { postsPerPage: POSTS_PER_PAGE, rootUrl } = cnoSiteData;
export const graphQL = `${rootUrl}/graphql`;

function App() {
	const [isLoading, setisLoading] = useState(true);
	const [posts, setPosts] = useState<Array<EventPost>>([]);
	const [filters, setFilters] = useState<Array<EventFilters>>([]);
	useEffect(() => {
		Model.getPosts().then(
			({ eventLocations, eventTypes, events, pageInfo }) => {
				setPosts(events.nodes);
				const filtersArr: EventFilters[] = [
					{
						type: {
							name: 'Event Types',
							filters: [...eventTypes.nodes],
						},
					},
					{
						type: {
							name: 'Locations',
							filters: [...eventLocations.nodes],
						},
					},
				];
				setFilters(filtersArr);
				setisLoading(false);
			},
		);
	}, []);
	const [checkedFilters, setCheckedFilters] = useState<string[]>([]);
	if (isLoading) {
		return (
			<div className="container">
				<LoadingSpinner />
			</div>
		);
	} else
		return (
			<div className="cno-search">
				<SearchBar
					filters={filters}
					checkedFilters={checkedFilters}
					setCheckedFilters={setCheckedFilters}
				/>
				<div className="container">
					<ResultsContainer
						posts={posts}
						checkedFilters={checkedFilters}
					/>
				</div>
			</div>
		);
}
const root = document.getElementById('app');
if (root) createRoot(root).render(<App />);
