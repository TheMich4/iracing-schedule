export const SORTING_KEY = 'sorting';

export type Order = 'asc' | 'desc' | 'none';

export interface SortingState {
	order: Order;
	id: string | null;
}

export const defaultSortingState = {
	asc: 'desc',
	id: null
};
