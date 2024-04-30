import type { DateValue } from '@internationalized/date';
import type { SeasonSchedule } from '@iracing-schedule/data';
import { getPreviousTuesdayString } from '@iracing-schedule/utils';
import type { FilterState } from './config/filter';
import type { SortingState } from './config/sorting';

export const getSchedule = (
	seasonSchedule: SeasonSchedule,
	date: DateValue,
	filter: FilterState,
	sorting: SortingState
) => {
	const tuesday = getPreviousTuesdayString(date as unknown as Date);

	let weekSchedule = seasonSchedule[tuesday];

	if (filter.class.length > 0) {
		weekSchedule = weekSchedule?.filter((series) => filter.class.includes(series.licenseGroup));
	}

	weekSchedule = weekSchedule?.sort((a, b) => {
		if (!sorting.id || sorting.id === 'class') {
			if (sorting.order === 'asc') {
				return a.licenseGroup > b.licenseGroup ? 1 : -1;
			} else {
				return a.licenseGroup < b.licenseGroup ? 1 : -1;
			}
		}

		return 0
	});

	return weekSchedule ?? [];
};
