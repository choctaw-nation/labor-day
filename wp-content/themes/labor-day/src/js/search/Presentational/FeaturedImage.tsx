import React from '@wordpress/element';
export default function FeaturedImage( {
	featuredImage: { altText, srcSet, size, sizes },
} ) {
	return (
		<figure className="cno-event__image">
			<img
				width={ size.width }
				height={ size.height }
				src=""
				className="attachment-large size-large wp-post-image"
				alt={ altText }
				decoding="async"
				srcSet={ srcSet }
				sizes={ sizes }
			/>
		</figure>
	);
}
