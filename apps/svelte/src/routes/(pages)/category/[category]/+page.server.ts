import seasonsData from '$lib/seasons-data.json';
import { routeToCategory } from '@/category';
import { COLUMN_KEY, defaultColumnState, type ColumnState } from '@/config/column';
import { FAVORITE_KEY, defaultFavoriteState, type FavoriteState } from '@/config/favorite';
import { FILTER_KEY, defaultFilterState, type FilterState } from '@/config/filter';

export function load({ locals, params }) {
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
		category: routeToCategory[params.category],
		column: data.get(COLUMN_KEY) as ColumnState,
		favorite: data.get(FAVORITE_KEY) as FavoriteState,
		filter: data.get(FILTER_KEY) as FilterState,
		schedule: seasonsData
	};
}
