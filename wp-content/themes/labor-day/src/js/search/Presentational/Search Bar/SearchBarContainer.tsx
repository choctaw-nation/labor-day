import React from 'react';

interface props {
	children?: React.ReactNode;
}

export default function SearchBarContainer( { children }: props ) {
	return (
		<section className="cno-event-search py-5 text-bg-primary">
			<div className="container">
				<h2 className="text-white">Search Events</h2>
				{ children }
			</div>
		</section>
	);
}
