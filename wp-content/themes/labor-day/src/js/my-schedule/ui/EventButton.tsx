import React from '@wordpress/element';

interface EventButtonProps {
	element: 'button' | 'a';
	href?: string;
	icon: React.Element | string;
	onClick?: () => void;
	text: string;
	classes?: string;
}
export default function EventButton( {
	element,
	icon,
	onClick,
	text,
	href,
	classes,
}: EventButtonProps ) {
	const Button = element;
	return (
		<Button
			className={ `cno-event-button ${ classes ?? '' }` }
			onClick={ onClick }
			dangerouslySetInnerHTML={ {
				__html: `${ icon }&nbsp;<span>${ text }</span>`,
			} }
			href={ href }
		/>
	);
}
