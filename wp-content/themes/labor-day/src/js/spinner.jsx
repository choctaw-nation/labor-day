import React from 'react';
import '../styles/components/loading-spinner.scss';

export default function LoadingSpinner() {
	const divs = [ 1, 2, 3, 4 ];
	return (
		<div className="lds-ring">
			{ divs.map( ( div, i ) => (
				<div key={ i } />
			) ) }
		</div>
	);
}
