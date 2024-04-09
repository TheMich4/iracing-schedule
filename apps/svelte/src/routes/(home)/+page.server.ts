import { seasonsData } from '@iracing-schedule/data';
import type { SeasonSchedule } from '@iracing-schedule/data';

export function load() {
	return {
		schedule: seasonsData as SeasonSchedule
	};
}
