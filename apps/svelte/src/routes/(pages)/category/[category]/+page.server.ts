import seasonsData from '$lib/seasons-data.json';
import { routeToCategory } from '@/category';
import { COLUMN_KEY, defaultColumnState } from '@/config/column';
import { FAVORITE_KEY, defaultFavoriteState, type FavoriteState } from '@/config/favorite';

export function load({ locals, params }) {
	const { data } = locals.session;

	if (!data.get(FAVORITE_KEY)) {
		data.set(FAVORITE_KEY, defaultFavoriteState);
	}
	if (!data.get(COLUMN_KEY)) {
		data.set(COLUMN_KEY, defaultColumnState);
	}

	return {
		category: routeToCategory[params.category],
		column: data.get(COLUMN_KEY) as ColumnState,
		favorite: data.get(FAVORITE_KEY) as FavoriteState,
		schedule: seasonsData
	};
}
