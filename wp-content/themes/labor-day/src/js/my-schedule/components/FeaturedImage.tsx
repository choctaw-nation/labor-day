// 3rd Party
import React from 'react';

// Types
import type { FeaturedImage as FeaturedImageType } from '../utilities/types';

export default function FeaturedImage( {
	featuredImage,
}: {
	featuredImage: FeaturedImageType;
} ) {
	const { altText, srcset, src } = featuredImage;

	return (
		<div className="cno-event__image col-xl-5 col-xxl-4 flex-grow-1 flex-lg-grow-0 order-1 order-xl-0">
			<figure className="ratio ratio-16x9 mb-0">
				<img
					src={ src }
					className="object-fit-cover w-100 h-auto"
					alt={ altText }
					decoding="async"
					srcSet={ srcset }
					loading="lazy"
				/>
			</figure>
		</div>
	);
}
