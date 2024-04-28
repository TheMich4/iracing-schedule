export const FAVORITE_KEY = 'favorite';

export interface FavoriteState {
	series: Record<string, boolean>;
	track: Record<string, boolean>;
}

export const defaultFavoriteState = {
	series: {},
	track: {}
}
