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

	let weekSchedule = $derived(
		getSchedule(data.schedule, scheduleState.date, filter).filter(
			(item) => item.category === data.category
		)
	);
</script>

<SchedulePage
	{column}
	data={weekSchedule}
	{favorite}
	{filter}
	title={categoryToName[data.category]}
/>
