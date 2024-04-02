import { getLocalTimeZone, today } from '@internationalized/date';

import type { DateValue } from '@internationalized/date';

let filter = $state('');
let date = $state<DateValue>(today(getLocalTimeZone()));

export default {
	get filter() {
		return filter;
	},
	set filter(f: string) {
		filter = f;
	},
	get date() {
		return date;
	},
	set date(d: DateValue) {
		date = d;
	}
};
