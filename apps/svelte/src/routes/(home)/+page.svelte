<script lang="ts">
	import { getScheduleState } from '$lib/store/schedule.svelte';
	import SchedulePage from '$lib/templates/schedule-page.svelte';
	import { getSchedule } from '$lib/schedule';

	let { data } = $props();

	let scheduleState = getScheduleState();

	let column = $state(data.column);
	let favorite = $state(data.favorite);
	let filter = $state(data.filter);
	let sorting = $state(data.sorting);

	const weekSchedule = $derived(getSchedule(data.schedule, scheduleState.date, filter));
</script>

<SchedulePage {column} data={weekSchedule} {favorite} {filter} {sorting} title="Schedule" />
