import { getPreviousTuesdayString } from '@iracing-schedule/utils';
import seasonsData from '$lib/seasons-data.json';

export function load() {
	const date = new Date();
	const tuesday = getPreviousTuesdayString(date);
	//
	// @ts-expect-error Add type
	const weekData = seasonsData[tuesday] ?? [];

	return {
		weekData
	};
}
