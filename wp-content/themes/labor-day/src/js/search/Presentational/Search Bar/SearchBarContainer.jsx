import React from 'react';

export default function SearchBarContainer( { children } ) {
	return (
		<section className="cno-event-search">
			<div className="container">
				<h2 className="cno-event-search__title">Search Events</h2>
				{ children }
			</div>
		</section>
	);
}
