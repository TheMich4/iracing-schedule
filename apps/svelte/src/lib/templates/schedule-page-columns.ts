import {
	IconArrowsUp,
	IconCalendarWeek,
	IconCar,
	IconCarCrash,
	IconCarGarage,
	IconClock,
	IconGps,
	IconRoad,
	IconSchool,
	IconStars,
	IconTool,
	IconUsersGroup
} from '@tabler/icons-svelte';

import CellCars from '$lib/components/schedule-table/cell-cars.svelte';
import CellCategory from '$lib/components/schedule-table/cell-category.svelte';
import CellCheck from '$lib/components/schedule-table/cell-check.svelte';
import CellClassIcon from '$lib/components/schedule-table/cell-class-icon.svelte';
import CellNextRace from '$lib/components/schedule-table/cell-next-race.svelte';
import CellTrack from '$lib/components/schedule-table/cell-track.svelte';
import { categoryToName } from '../../lib/category';

export const columns = [
	{
		id: 'class',
		label: 'Class',
		Icon: IconSchool,
		getValue: (row) => row.licenseGroup,
		class: 'w-[4.75rem]',
		contentClass: 'justify-center',
		Component: CellClassIcon
	},
	{
		id: 'category',
		label: 'Category',
		Icon: IconGps,
		getValue: (row) => categoryToName[row.category as keyof typeof categoryToName] ?? 'Unknown',
		class: 'w-[6.25rem]',
		Component: CellCategory
	},
	{
		id: 'series',
		label: 'Series',
		Icon: IconUsersGroup,
		getValue: (row) => row.seriesName,
		class: 'w-[250px]'
	},
	{
		id: 'track',
		label: 'Track',
		Icon: IconRoad,
		getValue: (row) => row.track.trackName,
		class: 'w-[300px]',
		Component: CellTrack
	},
	{
		id: 'cars',
		label: 'Cars',
		Icon: IconCar,
		getValue: (row) =>
			row.cars.length === 1
				? row.cars[0].carName
				: row.cars.map((car) => car.carNameAbbreviated).join(', '),
		class: 'w-[300px]',
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
		Icon: IconArrowsUp,
		getValue: (row) => row.startType,
		class: 'w-[110px]'
	},
	{
		id: 'week',
		label: 'Week',
		Icon: IconCalendarWeek,
		getValue: (row) => row.raceWeekNum,
		class: 'w-[4.65rem]',
		contentClass: 'justify-center'
	},
	{
		id: 'official',
		label: 'Official',
		Icon: IconStars,
		getValue: (row) => row.official,
		Component: CellCheck,
		class: 'w-[5.25rem]',
		contentClass: 'justify-center'
	},
	{
		id: 'fixed',
		label: 'Fixed',
		Icon: IconTool,
		getValue: (row) => row.fixedSetup,
		Component: CellCheck,
		class: 'w-[4.75rem]',
		contentClass: 'justify-center'
	},
	{
		id: 'multiClass',
		label: 'Multi',
		Icon: IconCarGarage,
		getValue: (row) => row.multiclass,
		Component: CellCheck,
		class: 'w-[4.25rem]',
		contentClass: 'justify-center'
	},
	{
		id: 'maxIncidents',
		label: 'Max Inc',
		Icon: IconCarCrash,
		getValue: (row) => row.incidentLimit,
		class: 'w-[5.75rem]',
		contentClass: 'justify-center'
	}
];
