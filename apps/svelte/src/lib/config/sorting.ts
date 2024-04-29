export const SORTING_KEY = 'sorting';

export interface SortingState {
	asc: boolean;
	id: string | null;
}

export const defaultSortingState = {
	asc: true,
	id: null
};
