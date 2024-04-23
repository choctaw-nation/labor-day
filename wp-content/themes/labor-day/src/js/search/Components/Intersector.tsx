import React, { useRef, useEffect } from 'react';

export default function Intersector( { dispatch } ) {
	const targetRef = useRef( null );

	useEffect( () => {
		const observer = new IntersectionObserver( ( entries ) => {
			entries.forEach( ( entry ) => {
				dispatch( {
					type: 'intersecting',
					payload: entry.isIntersecting,
				} );
			} );
		} );
		if ( targetRef.current ) {
			observer.observe( targetRef.current );
		}
		return () => {
			if ( targetRef.current ) {
				observer.unobserve( targetRef.current );
			}
		};
	}, [] );
	return <div className="intersector" ref={ targetRef }></div>;
}
