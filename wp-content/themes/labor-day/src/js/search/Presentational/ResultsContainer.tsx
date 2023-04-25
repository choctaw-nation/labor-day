import React from '@wordpress/element';
import SinglePost from './SinglePost';
import { PrettyEventData } from '../types';

export default function ResultsContainer({
	posts,
	checkedFilters,
}: {
	posts: PrettyEventData[];
	checkedFilters: string[];
}) {
	return (
		<section className="cno-events">
			{posts.map((post) => {
				if (checkedFilters.length === 0) {
					return <SinglePost data={post} />;
				} else if (
					[checkedFilters, post.locations, post.type].every(
						(el) => el.length > 0,
					)
				) {
					if (
						checkedFilters.includes(post.locations?.[0]?.name) ||
						checkedFilters.includes(post.type[0]?.name)
					) {
						return <SinglePost data={post} />;
					}
				} else {
					if (
						checkedFilters.includes(post.locations?.[0]?.name) &&
						checkedFilters.includes(post.type[0]?.name)
					) {
						return <SinglePost data={post} />;
					}
				}
				return null;
			})}
		</section>
	);
}
