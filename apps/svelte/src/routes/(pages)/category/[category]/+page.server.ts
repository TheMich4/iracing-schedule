import { routeToCategory } from '@/category';
import { getConfigData } from '@/config';
import { seasonsData } from '@iracing-schedule/data';

export function load({ locals, params }) {
	const { data } = locals.session;

	const configData = getConfigData(data);

	return {
		...configData,
		category: routeToCategory[params.category],
		schedule: seasonsData
	};
}
