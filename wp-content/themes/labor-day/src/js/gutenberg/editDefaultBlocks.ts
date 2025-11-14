import addFlexReverseToggle from '@choctawnationofoklahoma/wp-flex-reverse-toggle';
import domReady from '@wordpress/dom-ready';

function alterBlocks(): void {
	const namespace = 'cno-starter-theme';
	addFlexReverseToggle( namespace );
}

domReady( alterBlocks );
