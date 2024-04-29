import { COLUMN_KEY, defaultColumnState, type ColumnState } from '@/config/column';
import { defaultFavoriteState, FAVORITE_KEY, type FavoriteState } from '@/config/favorite';
import { defaultFilterState, FILTER_KEY, type FilterState } from '@/config/filter';
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
	if (!data.get(FILTER_KEY)) {
		data.set(FILTER_KEY, defaultFilterState);
	}

	return {
		column: data.get(COLUMN_KEY) as ColumnState,
		favorite: data.get(FAVORITE_KEY) as FavoriteState,
		filter: data.get(FILTER_KEY) as FilterState,
		schedule: seasonsData as SeasonSchedule
	};
}
