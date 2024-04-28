import { COLUMN_KEY, defaultColumnState, type ColumnState } from '@/config/column';
import { defaultFavoriteState, FAVORITE_KEY, type FavoriteState } from '@/config/favorite';
import { seasonsData } from '@iracing-schedule/data';
import type { SeasonSchedule } from '@iracing-schedule/data';

export function load({ locals }) {
	const { data } = locals.session;

	if (!data.get(FAVORITE_KEY)) {
		data.set(FAVORITE_KEY, defaultFavoriteState);
	}
	if (!data.get(COLUMN_KEY)) {
		data.set(COLUMN_KEY, defaultColumnState);
	}


	return {
		column: data.get(COLUMN_KEY) as ColumnState,
		favorite: data.get(FAVORITE_KEY) as FavoriteState,
		schedule: seasonsData as SeasonSchedule
	};
}
