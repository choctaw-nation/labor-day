const sectionObserver = new IntersectionObserver(reveal, {
	root: null,
	threshold: 0.15,
});
function reveal(entries, observer) {
	console.log(entries);
	const [entry] = entries;
	if (!entry.isIntersecting) return;
	entry.target.classList.remove('fadeIn--hide');
	observer.unobserve(entry.target);
}

/**
 * 1. Select elements wih `querySelectorAll`
 * 2. ForEach section, observe section
 */
export default function fadeIn(selector) {
	const elements = document.querySelectorAll(selector);
	elements.forEach((el) => {
		sectionObserver.observe(el);
		el.classList.add('fadeIn');
		el.classList.add('fadeIn--hide');
	});
}
