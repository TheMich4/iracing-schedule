<script lang="ts">
	import SchedulePage from '@/templates/schedule-page.svelte';
	import { getScheduleState } from '$lib/store/schedule.svelte';
	import { categoryToName } from '@iracing-schedule/data';
	import { getSchedule } from '$lib/schedule';

	let { data } = $props();

	let scheduleState = getScheduleState();

	let column = $state(data.column);
	let favorite = $state(data.favorite);
	let filter = $state(data.filter);
	let sorting = $state(data.sorting);

	let weekSchedule = $derived(
		getSchedule(data.schedule, scheduleState.date, filter, sorting).filter(
			(item) => item.category === data.category
		)
	);
</script>

<SchedulePage
	{column}
	data={weekSchedule}
	{favorite}
	{filter}
	{sorting}
	title={categoryToName[data.category]}
/>
