import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import { Map } from './js/Presentational/Leaflet';
import { Sidebar } from './js/Presentational/Sidebar';
import '../src/styles/main.scss';
function App() {
	const [reduceMotion, setReduceMotion] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	// const [pageQuery, setPageQuery] = useState(1);
	const [atBottom, setAtBottom] = useState(false);
	return (
		<>
			<Sidebar
				atBottom={atBottom}
				setAtBottom={setAtBottom}
				reduceMotion={reduceMotion}
				setReduceMotion={setReduceMotion}
				isLoading={isLoading}
				setIsLoading={setIsLoading}
			/>
			<Map />
		</>
	);
}
document.addEventListener('DOMContentLoaded', () => {
	console.log('hello from my plugin');
	createRoot(document.getElementById('cno-map-app')).render(<App />);
});
