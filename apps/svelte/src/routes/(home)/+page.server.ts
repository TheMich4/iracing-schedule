import { seasonsData } from '@iracing-schedule/data';
import type { SeasonSchedule } from '@iracing-schedule/data';

export function load({ locals }) {
	const { data } = locals.session;

	if (!data.get('favorite')) {
		data.set('favorite', { series: {} });
	}

	return {
		favorite: data.get('favorite'),
		schedule: seasonsData as SeasonSchedule
	};
}
