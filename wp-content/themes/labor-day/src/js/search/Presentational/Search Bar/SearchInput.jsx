export default function SearchInput({ search, dispatch }) {
	return (
		<input
			type="text"
			name="search"
			id="search"
			placeholder="Find an Event"
			className="cno-event-search__search-bar"
			value={search}
			onChange={(ev) => {
				dispatch({ type: 'doSearch', payload: ev.target.value });
			}}
		/>
	);
}
