import { IconCar, IconGps, IconRoad, IconSchool, IconUsersGroup } from '@tabler/icons-svelte';

export const columns = [
	{
		id: 'class',
		label: 'Class',
		Icon: IconSchool,
		getValue: (row) => row.licenseGroup,
		class: 'w-20',
		contentClass: 'justify-center'
	},
	{
		id: 'category',
		label: 'Category',
		Icon: IconGps,
		getValue: (row) => row.track.category
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
