class OldApp {
	#container = '';
	places = [];
	isLoading = true;
	#pageQuery = 0;
	selectedBusiness = {};

	constructor() {
		this.#pageQuery = 1;
		this.#getThePlaces().then( () => {
			this.#toggleLoadingMessage();
			this.#container.insertAdjacentHTML(
				'beforeend',
				this.#getTheMarkup()
			);
		} );
		// this.init();
	}

	#getThePlaces = async function () {
		this.isLoading = true;
		this.#toggleLoadingMessage();
		const businessURL =
			'https://choctawsmallbusiness.com/wp-json/wp/v2/places';
		const params = {
			fields: 'title,content,id,acf,_links&_embed=wp:term',
			order: 'asc',
			orderby: 'title',
			perPage: '10',
			page: this.#pageQuery,
		};
		const parameters = `?_fields=${ params.fields }&order=${ params.order }&orderby=${ params.orderby }&per_page=${ params.perPage }&page=${ params.page }`;
		// const parameters = `?_order=${params.order}&orderby=${params.orderby}&per_page=${params.perPage}&page=${params.page}`;
		try {
			const response = await getData( businessURL, parameters );
			if ( response.length === 0 ) {
				alert( 'No places to display!' );
				return;
			}
			this.places = response.map( ( place ) => {
				const embedded = place._embedded;
				const embeddedList = Object.values( embedded );
				const termsList = embeddedList[ 0 ][ 0 ];
				const terms = termsList.map( ( term ) => {
					return { id: term.id, name: term.name };
				} );
				return {
					title: place.title.rendered,
					content: place.content.rendered,
					terms: terms,
					acf: place.acf,
					id: place.id,
				};
			} );
			this.isLoading = false;
		} catch ( err ) {
			console.error( err );
		}
	};
	#toggleLoadingMessage( initialLoad = true ) {
		const loadingDiv = document.getElementById( 'loading' );
		const loadingMessage = initialLoad
			? 'Loading Chahtapreneurs...'
			: 'Loading More Chahtaprenuers...';
		loadingDiv.innerText = loadingMessage;
		if ( this.isLoading ) {
			! loadingDiv.classList.contains( 'show' )
				? loadingDiv.classList.add( 'show' )
				: '';
		} else loadingDiv.classList.remove( 'show' );
	}
	#getTheCoordinates = async function () {
		const promises = [];
		this.places.forEach( ( place ) => {
			if ( place.acf.remote === true ) {
				return;
			}
			const params = `?access_key=${ process.env.GEOCODE_ACCESS_KEY }&query=${ place.acf.address }&json=true`;
			const promise = getData(
				'http://api.positionstack.com/v1/forward',
				params
			)
				.then( ( { data } ) => {
					const coords = [ data[ 0 ].latitude, data[ 0 ].longitude ];
					place.coords = coords;
				} )
				.catch( ( err ) => {
					throw new Error( err.message );
				} );
			promises.push( promise );
		} );
		await Promise.all( promises );
	};

	#getTheMarkup() {
		let markup = '';
		for ( const place of this.places ) {
			const content = place.content.slice( 0, 141 ) + '...';
			const { acf, id } = place;
			markup += `
      <li class="business ${
			acf.remote === false ? 'business--physical' : 'business--remote'
		}" data-id=${ id }>
        <h3 class="business__title">${ place.title }</h3>
        ${
			acf.address &&
			`<span class="business__meta">${ acf.address }</span>`
		}
        <div class="business__details">
        ${ content }</div>
        ${
			acf.remote === false
				? ''
				: `<p class="business--online">Online Only</p>`
		}
      </li>`;
		}
		return markup;
	}

	#setSelectedBusiness( { target } ) {
		const business = target.closest( 'li' );
		const id = business.dataset.id;
		if ( business ) {
			if ( business.classList.contains( 'business--remote' ) ) {
				alert( 'This business is online only.' );
				return;
			}
			const [ setView ] = this.places.filter(
				( place ) => place.id == id
			);
			if ( setView === undefined ) {
				alert(
					'Hmm...something went wrong. Try selecting a different business.'
				);
				return;
			}
			this.selectedBusiness = setView;
		}
	}
	#generateMarker() {
		console.log( this.selectedBusiness );
		L.marker( this.selectedBusiness.coords )
			.addTo( map )
			.bindPopup(
				L.popup( {
					maxHeight: 250,
					maxWidth: 250,
					className: 'popup',
					content: `<h3>${ this.selectedBusiness.title }</h3><span class="business__meta">${ this.selectedBusiness.acf.address }</span><p>${ this.selectedBusiness.content }</p>`,
				} )
			)
			.openPopup();
	}

	#setMapView() {
		const checks = [
			this.selectedBusiness,
			...this.selectedBusiness.coords,
		];
		console.log( checks );
		const isUndefined = checks.some( ( value ) => value === undefined );
		if ( isUndefined ) {
			alert(
				'Hmm...something went wrong. Try selecting a different business.'
			);
			return;
		} else {
			if ( this.reduceMotion ) {
				map.setView( this.selectedBusiness.coords, 13 );
			} else
				map.flyTo( this.selectedBusiness.coords, 13, {
					duration: 1.5,
				} );
		}
	}

	#getMoreBusinesses( ev ) {
		if (
			this.#container.scrollTop + this.#container.clientHeight >=
			this.#container.scrollHeight
		) {
			if ( this.isLoading ) return;
			this.#container.removeEventListener(
				'scroll',
				this.#getMoreBusinesses
			);
			// this.init();
		}
	}
	init() {
		this.#pageQuery++;
		this.#getThePlaces()
			.then( () => {
				this.#getTheCoordinates()
					.then( () => {
						this.#container.insertAdjacentHTML(
							'beforeend',
							this.#getTheMarkup()
						);
						this.#container.addEventListener( 'click', ( ev ) => {
							this.#setSelectedBusiness( ev );
							this.#setMapView( ev );
							this.#generateMarker();
						} );
						this.isLoading = false;
						this.#toggleLoadingMessage();
						this.#container.addEventListener(
							'scroll',
							this.#getMoreBusinesses.bind( this )
						);
					} )
					.catch( ( err ) => console.error( err ) );
			} )
			.catch( ( err ) => console.error( err ) );
	}
}
