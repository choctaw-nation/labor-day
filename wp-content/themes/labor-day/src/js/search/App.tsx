import React, { useState, useEffect, createRoot } from '@wordpress/element';
import LoadingSpinner from '../spinner';
import Model from './Model';
import SearchBar from './SearchBar';
import ResultsContainer from './ResultsContainer';
import { EventFilter, EventPost } from './types';
declare const cnoSiteData: {
	rootUrl: string;
	postsPerPage: string;
};

export const { postsPerPage: POSTS_PER_PAGE, rootUrl } = cnoSiteData;
export const graphQL = `${rootUrl}/graphql`;
// export const { rootUrl } = cnoSiteData;
// export const POSTS_PER_PAGE = 10;

function App() {
	const [isLoading, setisLoading] = useState(true);
	const [posts, setPosts] = useState<Array<EventPost>>([]);
	const [filters, setFilters] = useState<Array<EventFilter>>();
	const [checkedFilters, setCheckedFilters] = useState([]);
	useEffect(() => {
		Model.getPosts().then(
			({ eventLocations, eventTypes, events, pageInfo }) => {
				setPosts(events.nodes);
				const filtersArr: EventFilter[] = [
					...eventTypes.nodes,
					...eventLocations.nodes,
				];
				setFilters(filtersArr);
				setisLoading(false);
			},
		);
	}, []);

	if (isLoading) {
		return <LoadingSpinner />;
	} else
		return (
			<div className="cno-search">
				<SearchBar
					filters={filters}
					setFilters={setFilters}
					checkedFilters={checkedFilters}
					setCheckedFilters={setCheckedFilters}
				/>
				<div className="container">
					<ResultsContainer posts={posts} />
				</div>
			</div>
		);
}
const root = document.getElementById('app');
if (root) createRoot(root).render(<App />);
