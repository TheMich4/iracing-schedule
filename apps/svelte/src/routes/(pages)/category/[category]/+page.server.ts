import seasonsData from '$lib/seasons-data.json';
import { routeToCategory } from '@/category';
import { FAVORITE_KEY, defaultFavoriteState, type FavoriteState } from '@/config/favorite';

export function load({ locals, params }) {
	const { data } = locals.session;

	if (!data.get(FAVORITE_KEY)) {
		data.set(FAVORITE_KEY, defaultFavoriteState);
	}

	return {
		category: routeToCategory[params.category],
		favorite: data.get(FAVORITE_KEY) as FavoriteState,
		schedule: seasonsData
	};
}
