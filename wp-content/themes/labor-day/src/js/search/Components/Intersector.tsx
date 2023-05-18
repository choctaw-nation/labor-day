import React, { useRef, useEffect } from '@wordpress/element';
export default function Intersector({ isVisible, setIsVisible }) {
	const targetRef = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				setIsVisible(entry.isIntersecting);
			});
		});
		if (targetRef.current) {
			observer.observe(targetRef.current);
		}
		return () => {
			if (targetRef.current) {
				observer.unobserve(targetRef.current);
			}
		};
	}, []);
	return <div className="intersector" ref={targetRef}></div>;
}
