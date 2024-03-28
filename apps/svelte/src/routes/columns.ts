import {
	IconCar,
	IconClock,
	IconGps,
	IconRoad,
	IconSchool,
	IconUsersGroup
} from '@tabler/icons-svelte';

import CellCars from '$lib/components/schedule-table/cell-cars.svelte';
import CellCategory from '$lib/components/schedule-table/cell-category.svelte';
import CellCheck from '$lib/components/schedule-table/cell-check.svelte';
import CellClassIcon from '$lib/components/schedule-table/cell-class-icon.svelte';
import CellNextRace from '$lib/components/schedule-table/cell-next-race.svelte';
import CellTrack from '$lib/components/schedule-table/cell-track.svelte';
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
		class: 'w-28',
		Component: CellCategory
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
		getValue: (row) => row.track.trackName,
		Component: CellTrack
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
		id: 'startType',
		label: 'Start Type',
		getValue: (row) => row.startType,
		class: 'w-24'
	},
	{
		id: 'week',
		label: 'Week',
		getValue: (row) => row.raceWeekNum,
		class: 'w-14',
		contentClass: 'justify-center'
	},
	{
		id: 'official',
		label: 'Official',
		getValue: (row) => row.official,
		Component: CellCheck,
		class: 'w-16',
		contentClass: 'justify-center'
	},
	{
		id: 'fixed',
		label: 'Fixed',
		getValue: (row) => row.fixedSetup,
		Component: CellCheck,
		class: 'w-16',
		contentClass: 'justify-center'
	},
	{
		id: 'multiClass',
		label: 'Multi',
		getValue: (row) => row.multiclass,
		Component: CellCheck,
		class: 'w-16',
		contentClass: 'justify-center'
	},
	{
		id: 'maxIncidents',
		label: 'Max Inc',
		getValue: (row) => row.incidentLimit,
		class: 'w-20'
	}
];
