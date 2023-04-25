const categories = [
	{
		name: 'beauty/health',
		displayName: 'Beauty/Health',
	},
	{
		name: 'construction',
		displayName: 'Construction',
	},
	{
		name: 'eat &amp; drink',
		displayName: 'Eat & Drink',
	},
	{
		name: 'entertainment',
		displayName: 'Entertainment',
	},
	{
		name: 'manufacturing',
		displayName: 'Manufacturing',
	},
	{
		name: 'services',
		displayName: 'Services',
	},
	{
		name: 'shopping',
		displayName: 'Shopping',
	},
	{
		name: 'stay',
		displayName: 'Stay',
	},
];
export function Categories( { filters, handleCategoryChange } ) {
	return (
		<ul
			className="categories"
			style={ {
				marginTop: '2rem',
			} }
		>
			<h3>Categories</h3>
			{ categories.map( ( category ) => {
				const isChecked = filters.includes( category.name );
				return (
					<Filter
						key={ category.name }
						name={ category.name }
						displayName={ category.displayName }
						checked={ isChecked }
						onChange={ handleCategoryChange }
					/>
				);
			} ) }
		</ul>
	);
}
export function Filter( { name, displayName, checked, onChange } ) {
	return (
		<li
			className={ `filter ${ checked ? 'selected' : '' }` }
			onClick={ () => onChange( name ) }
		>
			<label htmlFor={ name }>{ displayName }</label>
			<input
				type="checkbox"
				name={ name }
				id={ name }
				checked={ checked }
				onChange={ () => {} }
			/>
		</li>
	);
}

export function FilterControlsToggle( {
	showFilters,
	setShowFilters,
	filters,
	setFilters,
} ) {
	return (
		<div className="filters__control">
			{ filters.categories.length > 0 && (
				<span
					className="hide-filters--alt"
					onClick={ () =>
						setFilters( { categories: [], option: 'Both' } )
					}
				>
					Reset Filters
				</span>
			) }
			<span
				style={ { marginLeft: 10 } }
				className={ showFilters ? 'hide-filters' : 'hide-filters--alt' }
				onClick={ () => setShowFilters( ! showFilters ) }
			>
				{ showFilters ? 'Hide Filters' : 'Show Filters' }
			</span>
		</div>
	);
}

export function FilterOptions( { setOption, option } ) {
	const choices = [ 'Online-Only', 'Physical', 'Both' ];
	return (
		<ul
			className="filters__options"
			onClick={ ( { target } ) =>
				setOption(
					target.closest( 'li' ).querySelector( 'input' ).value
				)
			}
		>
			{ choices.map( ( choice ) => (
				<li key={ choice }>
					<input
						value={ choice }
						type="radio"
						checked={ option === choice }
						onChange={ () => {} }
						name="choice"
					/>
					<label> { ` ${ choice }` }</label>
				</li>
			) ) }
		</ul>
	);
}
