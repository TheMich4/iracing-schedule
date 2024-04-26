import seasonsData from '$lib/seasons-data.json';
import { routeToCategory } from '@/category';

export function load({ locals, params }) {
	const { data } = locals.session;

	if (!data.get('favorite')) {
		data.set('favorite', { series: {} });
	}

	return {
		category: routeToCategory[params.category],
		favorite: data.get('favorite'),
		schedule: seasonsData
	};
}
