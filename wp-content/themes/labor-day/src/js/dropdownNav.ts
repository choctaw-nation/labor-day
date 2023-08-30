const nav = document.querySelector('.navbar');
const dropdownElementList = nav?.querySelectorAll('.dropdown-toggle');

function toggleShow({ target }) {
	let expanded = target.getAttribute('aria-expanded');
	target.classList.toggle('show');
	target.setAttribute('aria-expanded', true === expanded ? 'false' : 'true');
	const submenu = target
		.closest('.menu-item-has-children')
		.querySelector('.dropdown-menu');
	submenu.classList.toggle('show');
	submenu.setAttribute('data-bs-popper', 'static');
}

dropdownElementList?.forEach((el) => {
	if (el.closest('.mobile-navbar')) return;
	el.addEventListener('mouseover', toggleShow);
});
