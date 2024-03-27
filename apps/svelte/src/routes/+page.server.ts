import seasonsData from '$lib/seasons-data.json';

export function load() {
	// @ts-expect-error Add type
	const weekData = seasonsData['2024-04-02'];

	return {
		weekData
	};
}
