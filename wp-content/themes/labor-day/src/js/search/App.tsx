import React, { useState, useEffect, createRoot } from '@wordpress/element';
import LoadingSpinner from '../spinner';
import Model from './Model';
import SearchBar from './Components/SearchBar';
import ResultsContainer from './Presentational/ResultsContainer';
import { EventFilters, EventPost } from './types';
import Fuse from 'fuse.js';
import { destructureData, fuzzySearchKeys } from './Utilities';

function App() {
	const [ isLoading, setIsLoading ] = useState( true );
	const [ posts, setPosts ] = useState< EventPost[] >( [] );
	const [ filters, setFilters ] = useState< EventFilters[] >( [] );
	const [ search, setSearch ] = useState( '' );
	useEffect( () => {
		if ( '' === search ) {
			console.log( Model.getPosts );
			const data = Model.getPosts()
				.then( ( data ) => {
					console.log( data );
					const { eventLocations, eventTypes, events } = data;
					setPosts(
						events.nodes.map( ( node ) => destructureData( node ) )
					);
					const filtersArr: EventFilters[] = [
						{
							type: {
								name: 'Event Types',
								filters: [ ...eventTypes.nodes ],
							},
						},
						{
							type: {
								name: 'Locations',
								filters: [ ...eventLocations.nodes ],
							},
						},
					];
					setFilters( filtersArr );
					setIsLoading( false );
				} )
				.catch( ( err ) => console.error( err ) );
		}
	}, [ search ] );

	function handleSearchInput( { target } ) {
		setSearch( target.value );
	}
	useEffect( () => {
		if ( '' === search ) return;
		setIsLoading( true );
		const timeout = setTimeout( () => {
			const fuse = new Fuse( posts, {
				...fuzzySearchKeys,
			} );
			const results = fuse.search( search );
			setPosts( results.map( ( result ) => result.item ) );
			setIsLoading( false );
		}, 500 );
		return () => clearTimeout( timeout );
	}, [ search ] );
	const [ checkedFilters, setCheckedFilters ] = useState< string[] >( [] );
	return (
		<div className="cno-search">
			<SearchBar
				filters={ filters }
				search={ search }
				checkedFilters={ checkedFilters }
				setCheckedFilters={ setCheckedFilters }
				handleSearchInput={ handleSearchInput }
			/>
			<div className="container">
				{ ! isLoading ? (
					<ResultsContainer
						posts={ posts }
						checkedFilters={ checkedFilters }
					/>
				) : (
					<LoadingSpinner />
				) }
			</div>
		</div>
	);
}
const root = document.getElementById( 'app' );
if ( root ) createRoot( root ).render( <App /> );
