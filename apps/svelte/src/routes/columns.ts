import { IconCar, IconGps, IconRoad, IconSchool, IconUsersGroup } from '@tabler/icons-svelte';

export const columns = [
	{
		id: 'class',
		label: 'Class',
		Icon: IconSchool
	},
	{
		id: 'category',
		label: 'Category',
		Icon: IconGps
	},
	{
		id: 'Series',
		label: 'series',
		Icon: IconUsersGroup
	},
	{
		id: 'track',
		label: 'Track',
		Icon: IconRoad
	},
	{
		id: 'cars',
		label: 'Cars',
		Icon: IconCar
	}
];
