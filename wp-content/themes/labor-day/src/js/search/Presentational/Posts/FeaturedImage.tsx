// 3rd Party
import React from 'react';

// Types
import { FeaturedImage as FeaturedImageType } from '../../types';

export default function FeaturedImage( {
	featuredImage,
}: {
	featuredImage: FeaturedImageType;
} ) {
	const { altText, srcset, src } = featuredImage;

	return (
		<div className="cno-event__image col-xl-4 col-xxl-3">
			<figure className="ratio ratio-16x9 h-100">
				<img
					src={ src }
					className="wp-post-image object-fit-cover w-100 h-100"
					alt={ altText }
					decoding="async"
					srcSet={ srcset }
					loading="lazy"
				/>
			</figure>
		</div>
	);
}
