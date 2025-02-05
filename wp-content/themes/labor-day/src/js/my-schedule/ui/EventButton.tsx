import React from '@wordpress/element';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface EventButtonProps {
	element: 'button' | 'a';
	href?: string;
	icon: IconDefinition;
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
			href={ href }
		>
			<FontAwesomeIcon icon={ icon } />
			&nbsp;
			{ text }
		</Button>
	);
}
