import { useState } from 'react';
import {
	Categories,
	FilterControlsToggle,
	FilterOptions,
} from '../components/_SearchFilters';

export function SearchFilters( {
	handleCategoryChange,
	option,
	setOption,
	filters,
	setFilters,
} ) {
	const [ showFilters, setShowFilters ] = useState( false );

	return (
		<aside className="filters">
			<header className="filters__header">
				<h2>Filters</h2>
				<FilterControlsToggle
					filters={ filters }
					setFilters={ setFilters }
					showFilters={ showFilters }
					setShowFilters={ setShowFilters }
				/>
			</header>
			<div className="filters__container">
				{ showFilters && (
					<FilterOptions option={ option } setOption={ setOption } />
				) }
				{ showFilters && (
					<Categories
						filters={ filters.categories }
						setFilters={ setFilters }
						handleCategoryChange={ handleCategoryChange }
					/>
				) }
			</div>
		</aside>
	);
}
