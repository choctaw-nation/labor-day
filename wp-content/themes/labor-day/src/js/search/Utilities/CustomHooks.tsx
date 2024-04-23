import { useState, useEffect } from '@wordpress/element';

/** Custom Hook to control Filter Visibility */
export function useShowFilters() {
	const [ showFilters, setShowFilters ] = useState( true );
	const [ windowWidth, setWindowWidth ] = useState( window.innerWidth );

	useEffect( () => {
		function handleResize() {
			setWindowWidth( window.innerWidth );
		}
		window.addEventListener( 'resize', handleResize );
		return () => {
			window.removeEventListener( 'resize', handleResize );
		};
	}, [] );

	useEffect( () => {
		if ( windowWidth > 767 ) {
			setShowFilters( true );
		} else setShowFilters( false );
	}, [ windowWidth ] );
	return { showFilters, setShowFilters, windowWidth };
}
