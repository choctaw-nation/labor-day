import React from 'react';

interface props {
	children?: React.ReactNode;
}

export default function SearchBarContainer( { children }: props ) {
	return (
		<section className="cno-event-search">
			<div className="container">
				<h2 className="cno-event-search__title">Search Events</h2>
				{ children }
			</div>
		</section>
	);
}
