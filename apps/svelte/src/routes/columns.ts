import {
	IconCar,
	IconClock,
	IconGps,
	IconRoad,
	IconSchool,
	IconUsersGroup
} from '@tabler/icons-svelte';

import CellCars from '$lib/components/schedule-table/cell-cars.svelte';
import CellClassIcon from '$lib/components/schedule-table/cell-class-icon.svelte';
import CellNextRace from '$lib/components/schedule-table/cell-next-race.svelte';
import { categoryToName } from '../lib/category';

export const columns = [
	{
		id: 'class',
		label: 'Class',
		Icon: IconSchool,
		getValue: (row) => row.licenseGroup,
		class: 'w-20',
		contentClass: 'justify-center',
		Component: CellClassIcon
	},
	{
		id: 'category',
		label: 'Category',
		Icon: IconGps,
		getValue: (row) =>
			categoryToName[row.track.category as keyof typeof categoryToName] ?? 'Unknown',
		class: 'w-28'
	},
	{
		id: 'series',
		label: 'Series',
		Icon: IconUsersGroup,
		getValue: (row) => row.seriesName
	},
	{
		id: 'track',
		label: 'Track',
		Icon: IconRoad,
		getValue: (row) => row.track.trackName
	},
	{
		id: 'cars',
		label: 'Cars',
		Icon: IconCar,
		getValue: (row) => row.cars.map((car) => car.carNameAbbreviated).join(', '),
		Component: CellCars
	},
	{
		id: 'nextRace',
		label: 'Next Race',
		Icon: IconClock,
		getValue: () => '',
		class: 'w-36',
		Component: CellNextRace
	},
	{
		id: 'week',
		label: 'Week',
		getValue: (row) => row.raceWeekNum,
		class: 'w-14'
	},
	{
		id: 'maxIncidents',
		label: 'Max Inc',
		getValue: (row) => row.incidentLimit,
		class: 'w-20'
	}
];
