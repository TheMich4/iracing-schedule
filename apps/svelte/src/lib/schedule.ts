import type { DateValue } from '@internationalized/date';
import type { SeasonSchedule } from '@iracing-schedule/data';
import { getPreviousTuesdayString } from '@iracing-schedule/utils';
import type { FilterState } from './config/filter';

export const getSchedule = (
	seasonSchedule: SeasonSchedule,
	date: DateValue,
	filter: FilterState
) => {
	const tuesday = getPreviousTuesdayString(date as unknown as Date);

	let weekSchedule = seasonSchedule[tuesday];

	if (filter.class.length > 0) {
		weekSchedule = weekSchedule?.filter((series) => filter.class.includes(series.licenseGroup));
	}

	return weekSchedule ?? [];
};
