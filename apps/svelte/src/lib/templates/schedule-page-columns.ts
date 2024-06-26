import {
	IconArrowsUp,
	IconCalendarWeek,
	IconCar,
	IconCarCrash,
	IconCarGarage,
	IconClock,
	IconCloudRain,
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
import CellSeries from '$lib/components/schedule-table/cell-series.svelte';
import { categoryToName } from '$lib/category';
import type { Column } from '@/templates/column';

export const columns: Column[] = [
	{
		Component: CellClassIcon,
		Icon: IconSchool,
		class: 'w-[4.75rem]',
		getValue: (row) => row.licenseGroup,
		id: 'class',
		label: 'Class'
	},
	{
		Component: CellCategory,
		Icon: IconGps,
		class: 'w-[7rem]',
		getValue: (row) => categoryToName[row.category as keyof typeof categoryToName] ?? 'Unknown',
		id: 'category',
		label: 'Category'
	},
	{
		Component: CellSeries,
		Icon: IconUsersGroup,
		class: 'w-[250px]',
		getValue: (row) => row.seriesName,
		id: 'series',
		label: 'Series'
	},
	{
		Component: CellTrack,
		Icon: IconRoad,
		class: 'w-[300px]',
		getValue: (row) => row.track.trackName,
		id: 'track',
		label: 'Track'
	},
	{
		Component: CellCars,
		Icon: IconCar,
		class: 'w-[300px]',
		getValue: (row) =>
			row.cars.length === 1
				? row.cars[0].carName
				: row.cars.map((car) => car.carNameAbbreviated).join(', '),
		id: 'cars',
		label: 'Cars'
	},
	{
		Component: CellNextRace,
		Icon: IconClock,
		class: 'w-36',
		getValue: () => '',
		id: 'nextRace',
		label: 'Next Race'
	},
	{
		Icon: IconArrowsUp,
		class: 'w-[110px]',
		getValue: (row) => row.startType,
		id: 'startType',
		label: 'Start Type'
	},
	{
		Icon: IconCalendarWeek,
		class: 'w-[4.65rem]',
		contentClass: 'justify-center',
		getValue: (row) => row.raceWeekNum,
		id: 'week',
		label: 'Week'
	},
	{
		Component: CellCheck,
		Icon: IconStars,
		class: 'w-[5.25rem]',
		contentClass: 'justify-center',
		getValue: (row) => row.official,
		id: 'official',
		label: 'Official'
	},
	{
		Component: CellCheck,
		Icon: IconTool,
		class: 'w-[4.75rem]',
		contentClass: 'justify-center',
		getValue: (row) => row.fixedSetup,
		id: 'fixed',
		label: 'Fixed Setup'
	},
	{
		Component: CellCheck,
		Icon: IconCarGarage,
		class: 'w-[4.25rem]',
		contentClass: 'justify-center',
		getValue: (row) => row.multiclass,
		id: 'multiClass',
		label: 'Multi Class'
	},
	{
		Icon: IconCarCrash,
		class: 'w-[5rem]',
		getValue: (row) => row.incidentLimit,
		id: 'maxIncidents',
		label: 'Max Incidents'
	},
	{
		Icon: IconCloudRain,
		class: 'w-[3.5rem]',
		getValue: (row) => `${row.weather?.weatherSummary?.maxPrecipRate ?? 0}%`,
		id: 'rain',
		label: 'Rain Chance'
	}
];
