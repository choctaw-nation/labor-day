import React, { useState, useEffect, createRoot } from '@wordpress/element';
import LoadingSpinner from '../spinner';
import Model from './Model';
import SearchBar from './SearchBar';
import ResultsContainer from './ResultsContainer';
declare const cnoSiteData: {
	rootUrl: string;
	postsPerPage: string;
};

export const { postsPerPage: POSTS_PER_PAGE, rootUrl } = cnoSiteData;
export const graphQL = `${rootUrl}/graphql`;
function App() {
	const [isLoading, setisLoading] = useState(true);
	const [data, setData] = useState({});
	useEffect(() => {
		Promise.all([Model.getFilters(), Model.getPosts()]).then(
			([filters, data]) => {
				setFilters(filters);
				setData(data);
				setisLoading(false);
			},
		);
	}, []);

	const [filters, setFilters] = useState([]);

	if (isLoading) {
		return <LoadingSpinner />;
	} else
		return (
			<div className="cno-search">
				<SearchBar filters={filters} setFilters={setFilters} />
				<div className="container">
					<ResultsContainer posts={data} />
				</div>
			</div>
		);
}
const root = document.getElementById('app');
if (root) createRoot(root).render(<App />);
