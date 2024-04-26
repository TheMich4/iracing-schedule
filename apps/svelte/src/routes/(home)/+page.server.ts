import { defaultFavoriteState, FAVORITE_KEY, type FavoriteState } from '@/config/favorite';
import { seasonsData } from '@iracing-schedule/data';
import type { SeasonSchedule } from '@iracing-schedule/data';

export function load({ locals }) {
	const { data } = locals.session;

	if (!data.get(FAVORITE_KEY)) {
		data.set(FAVORITE_KEY, defaultFavoriteState);
	}

	return {
		favorite: data.get(FAVORITE_KEY) as FavoriteState,
		schedule: seasonsData as SeasonSchedule
	};
}
