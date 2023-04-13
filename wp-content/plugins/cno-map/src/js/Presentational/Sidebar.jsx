import { useState } from 'react';
import {
	Logo,
	ReduceMotionToggle,
	LoadingMesssage,
} from '../components/Utilities';
import { SearchFilters } from './SearchFilters';

export function Sidebar({
	reduceMotion,
	setReduceMotion,
	isLoading,
	setIsLoading,
	businessListings,
	atBottom,
	setAtBottom,
}) {
	const [filters, setFilters] = useState({ categories: [], option: 'Both' });
	function handleCategoryChange(filterName) {
		const { categories } = filters;
		if (categories.includes(filterName)) {
			setFilters((prev) => {
				return {
					...prev,
					categories: categories.filter(
						(name) => name !== filterName,
					),
				};
			});
		} else {
			setFilters((prev) => {
				return {
					...prev,
					categories: [...prev.categories, filterName],
				};
			});
		}
	}

	const [option, setOption] = useState('Both');
	return (
		<div className="sidebar">
			<Logo />
			<ReduceMotionToggle
				reduceMotion={reduceMotion}
				setReduceMotion={setReduceMotion}
			/>
			<SearchFilters
				filters={filters}
				setFilters={setFilters}
				handleCategoryChange={handleCategoryChange}
				option={option}
				setOption={setOption}
			/>
			{isLoading && <LoadingMesssage />}
		</div>
	);
}
