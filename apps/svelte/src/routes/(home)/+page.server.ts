import { getConfigData } from '@/config';
import { seasonsData } from '@iracing-schedule/data';
import type { SeasonSchedule } from '@iracing-schedule/data';

export function load({ locals }) {
	const { data } = locals.session;

	const configData = getConfigData(data);

	return {
		...configData,
		schedule: seasonsData as SeasonSchedule
	};
}
