import React from '@wordpress/element';
import { featuredImage } from '../types';
export default function FeaturedImage( {
	featuredImage,
}: {
	featuredImage: featuredImage;
} ) {
	const { altText, srcSet, mediaDetails, sizes } = featuredImage;

	return (
		<figure>
			<img
				width={ mediaDetails.sizes[ 0 ].width }
				height={ mediaDetails.sizes[ 0 ].height }
				src={ mediaDetails.sizes[ 0 ].sourceUrl }
				className="attachment-large size-large wp-post-image"
				alt={ altText }
				decoding="async"
				srcSet={ srcSet }
				sizes={ sizes }
			/>
		</figure>
	);
}
