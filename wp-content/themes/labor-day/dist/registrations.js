! ( function () {
	'use strict';
	const e = new IntersectionObserver(
		function ( e, t ) {
			const [ s ] = e;
			s.isIntersecting &&
				( s.target.classList.remove( 'fadeIn--hide' ),
				t.unobserve( s.target ) );
		},
		{ root: null, threshold: 0.15 }
	);
	document
		.querySelectorAll( '.registration-form-list__item' )
		.forEach( ( t ) => {
			e.observe( t ),
				t.classList.add( 'fadeIn' ),
				t.classList.add( 'fadeIn--hide' );
		} );
} )();
