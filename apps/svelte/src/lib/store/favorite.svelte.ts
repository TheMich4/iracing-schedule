let series = $state<Record<number, boolean>>({});

export function getFavoriteState() {
	return {
		get series() {
			return series;
		},
		toggleSeries: (seriesId: number) => {
			console.log('toggleSeries', { series, seriesId });
			series = {
				...series,
				[seriesId]: !series[seriesId]
			};
		}
	};
}
