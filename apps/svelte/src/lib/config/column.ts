export const COLUMN_KEY = 'column';

export interface ColumnState {
	visibility: Record<string, boolean>;
}

export const defaultColumnState = {
	visibility: {
		class: true,
		category: true,
		series: true,
		track: true,
		cars: true,
		nextRace: true,
		startType: false,
		week: false,
		official: false,
		fixed: true,
		multiClass: false,
		maxIncidents: false,
		rain: true
	}
}
