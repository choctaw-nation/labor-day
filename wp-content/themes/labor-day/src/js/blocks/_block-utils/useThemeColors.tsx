import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

export default function useThemeColors() {
	const themeColors = useSelect(
		( select ) => select( blockEditorStore ).getSettings().colors,
		[]
	);
	return { themeColors };
}
