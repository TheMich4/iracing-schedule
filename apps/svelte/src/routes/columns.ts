import { IconCar, IconGps, IconRoad, IconSchool, IconUsersGroup } from '@tabler/icons-svelte';

import ClassIcon from '../lib/components/class-icon.svelte';
import { categoryToName } from '../lib/category';

export const columns = [
	{
		id: 'class',
		label: 'Class',
		Icon: IconSchool,
		getValue: (row) => row.licenseGroup,
		class: 'w-20',
		contentClass: 'justify-center',
		Component: ClassIcon
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
		getValue: (row) => row.carClassIds.join(', ')
	}
];
