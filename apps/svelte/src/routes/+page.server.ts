import seasonsData from '$lib/seasons-data.json';

export function load() {
	return {
		schedule: seasonsData
	};
}
