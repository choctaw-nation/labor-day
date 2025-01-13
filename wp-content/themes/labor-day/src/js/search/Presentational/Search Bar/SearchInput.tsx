import React from 'react';

export default function SearchInput( { search, dispatch } ) {
	return (
		<input
			type="text"
			name="search"
			id="search"
			placeholder="Find an Event"
			className="cno-event-search__search-bar w-100 rounded-4 p-3 mb-4 border-0"
			value={ search }
			onChange={ ( ev ) => {
				dispatch( { type: 'doSearch', payload: ev.target.value } );
			} }
		/>
	);
}
