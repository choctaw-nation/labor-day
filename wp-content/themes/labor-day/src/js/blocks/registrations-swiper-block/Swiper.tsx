import useSwiper from './hooks/useSwiper';
import { RegistrationPage } from './types';

interface SwiperProps {
	pages: RegistrationPage[];
}
export default function Swiper( { pages }: SwiperProps ) {
	const { swiperRef } = useSwiper();
	return (
		<div className="swiper-container">
			<div className="row">
				<div className="col-1">
					<div className="swiper-button-prev registration-swiper-navigation" />
				</div>
				<div className="col-10">
					<div className="swiper" ref={ swiperRef }>
						<div className="swiper-wrapper">
							{ pages.map( ( page ) => (
								<SwiperSlide page={ page } key={ page.id } />
							) ) }
						</div>
					</div>
				</div>
				<div className="col-1">
					<div className="swiper-button-next registration-swiper-navigation" />
				</div>
			</div>
			<div className="row">
				<div className="col-12">
					<div className="swiper-pagination registration-swiper-pagination" />
				</div>
			</div>
		</div>
	);
}

function SwiperSlide( { page }: { page: RegistrationPage } ) {
	const webpUrl = page._embedded[ 'wp:featuredmedia' ][ 0 ].source_url_webp;
	const imageUrl =
		webpUrl || page._embedded[ 'wp:featuredmedia' ][ 0 ].source_url;
	return (
		<div className="swiper-slide" key={ page.id }>
			<figure className="swiper-slide__image-container">
				<img
					className="swiper-slide__image"
					src={ imageUrl }
					alt={ page._embedded[ 'wp:featuredmedia' ][ 0 ].alt_text }
				/>
			</figure>
			<h3 className="swiper-slide__title">{ page.title.raw }</h3>
		</div>
	);
}
