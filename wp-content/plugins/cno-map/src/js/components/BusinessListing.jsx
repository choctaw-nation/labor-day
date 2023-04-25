import { useState, useEffect, useRef } from 'react';

function locationOption( option, listing ) {
	const choice = option.toLowerCase();
	if ( choice === 'online-only' ) {
		return listing.acf.remote != false;
	} else if ( choice === 'physical' ) {
		return listing.acf.remote === false;
	} else {
		return true;
	}
}
export function BusinessListings( {
	atBottom,
	setAtBottom,
	option,
	businessListings,
	isLoading,
	setIsLoading,
	filters,
} ) {
	const [ listings, setListings ] = useState( businessListings );
	const ul = useRef();
	function filterListings() {
		if ( 0 === filters.categories.length ) {
			const filteredListings = businessListings.filter( ( listing ) =>
				locationOption( option, listing )
			);
			setListings( filteredListings );
		} else {
			const filteredListings = businessListings.filter( ( listing ) =>
				filters.categories.some(
					( filter ) =>
						listing.terms.has( filter ) &&
						locationOption( option, listing )
				)
			);
			setListings( filteredListings );
		}
	}
	useEffect( () => {
		filterListings();
	}, [ businessListings, filters, option ] );

	function handleScroll() {
		const container = ul.current;
		if (
			container.scrollTop + container.clientHeight >=
			container.scrollHeight
		) {
			console.log( 'scrolled to bottom!', isLoading );
			if ( isLoading ) return;
			container.removeEventListener( 'scroll', this );
			setIsLoading( true );
		}
	}
	// useEffect(() => {
	//   const container = ul.current;
	//   container.addEventListener('scroll', handleScroll);
	//   return () => {
	//     if (isLoading) return;
	//     container.removeEventListener('scroll', handleScroll);
	//   };
	// }, []);
	return (
		<ul className="businesses" ref={ ul }>
			{ listings.map( ( listing ) => {
				const content = listing.content.slice( 0, 141 ) + '...';

				return (
					<li
						className={
							listing.acf.remote === false
								? 'business business--physical'
								: 'business business--remote'
						}
						data-id={ listing.id }
						key={ listing.id }
					>
						<h3
							className="business__title"
							dangerouslySetInnerHTML={ {
								__html: listing.title,
							} }
						/>
						{ listing.acf.address && (
							<span className="business__meta">
								{ listing.acf.address }
							</span>
						) }
						<div
							className="business__details"
							dangerouslySetInnerHTML={ { __html: content } }
						/>
						{ listing.acf.remote === false ? (
							''
						) : (
							<p className="business--online">Online Only</p>
						) }
					</li>
				);
			} ) }
		</ul>
	);
}
