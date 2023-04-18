export const handleDropdownNav = new DropdownNav();

class DropdownNav {
	submenus = [];
	constructor() {
		console.log('ready to work');
		this.submenus = document.querySelectorAll('.sub-menu');
		// this.hideSubmenus();
		// this.handleMenuHover();
	}
	hideSubmenus() {
		this.submenus.forEach((submenu) => submenu.classList.add('hide'));
	}
	handleMenuHover() {
		const nav = document.getElementById('menu-main-menu');
		nav.addEventListener('mouseover', this.showSubmenu);
	}
	showSubmenu({ target }) {
		const submenu = target
			.closest('.menu-item-has-children')
			.querySelector('.sub-menu');
		submenu.classList.toggle('hide');
	}
}
