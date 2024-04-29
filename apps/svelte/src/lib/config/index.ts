import { COLUMN_KEY, defaultColumnState, type ColumnState } from './column';
import { FAVORITE_KEY, defaultFavoriteState, type FavoriteState } from './favorite';
import { FILTER_KEY, defaultFilterState, type FilterState } from './filter';
import { SORTING_KEY, defaultSortingState, type SortingState } from './sorting';

export const getConfigData = (data?: Map<string, unknown>) => {
	if (!data) {
		data = new Map();
	}

	if (!data.get(FAVORITE_KEY)) {
		data.set(FAVORITE_KEY, defaultFavoriteState);
	}
	if (!data.get(COLUMN_KEY)) {
		data.set(COLUMN_KEY, defaultColumnState);
	}
	if (!data.get(FILTER_KEY)) {
		data.set(FILTER_KEY, defaultFilterState);
	}
	if (!data.get(SORTING_KEY)) {
		data.set(SORTING_KEY, defaultSortingState);
	}

	return {
		column: data.get(COLUMN_KEY) as ColumnState,
		favorite: data.get(FAVORITE_KEY) as FavoriteState,
		filter: data.get(FILTER_KEY) as FilterState,
		sorting: data.get(SORTING_KEY) as SortingState
	};
};
