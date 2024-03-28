export function nearestDate(dates: Array<Date>, target: Date) {
	if (!target) {
		target = Date.now();
	} else if (target instanceof Date) {
		target = target.getTime();
	}

	let nearest = Infinity;
	let winner = -1;

	dates.forEach(function (date, index) {
		if (date instanceof Date) {
			date = date.getTime();
		}
		const distance = Math.abs(date - target);
		if (distance < nearest) {
			nearest = distance;
			winner = index;
		}
	});

	return winner;
}

export function nearestFutureDate(dates: Array<Date>, target: Date) {
	if (!target) {
		target = Date.now();
	} else if (target instanceof Date) {
		target = target.getTime();
	}

	let nearest = Infinity;
	let winner = -1;

	dates.forEach(function (date, index) {
		if (date instanceof Date) {
			date = date.getTime();
		}

		if (date < target) return;

		const distance = Math.abs(date - target);
		if (distance < nearest) {
			nearest = distance;
			winner = index;
		}
	});

	return winner;
}
