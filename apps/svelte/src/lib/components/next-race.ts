import type { RaceTimeDescriptor } from 'iracing-api';
import { nearestFutureDate } from '../date';

export const getRaceTimes = (raceTimeDescriptor: RaceTimeDescriptor) => {
	const { repeatMinutes, firstSessionTime, sessionTimes } = raceTimeDescriptor;

	if (sessionTimes) {
		return sessionTimes.map((sessionTime) => new Date(sessionTime));
	}

	if (!firstSessionTime || !repeatMinutes) return [];

	const start = firstSessionTime.split(':');
	const hToAdd = Math.floor(repeatMinutes / 60);
	const mToAdd = repeatMinutes % 60;
	const times: Date[] = [];

	let h = +start.at(0)!,
		m = +start.at(1)!;

	do {
		const d = new Date();
		d.setUTCHours(h);
		d.setMinutes(m);
		d.setSeconds(0);

		h = h + hToAdd;
		m = m + mToAdd;

		times.push(d);
	} while (h < 24 && m < 60);

	return times;
};

export const getMinutesToNextRace = (times: Array<Date>) => {
	const time = new Date();
	const index = nearestFutureDate(times, time);

	if (index < 0) return undefined;

	const date = times[index];

	const delta = date.getTime() - time.getTime();
	const minutes = Math.round(delta / 1000 / 60);

	return minutes;
};
