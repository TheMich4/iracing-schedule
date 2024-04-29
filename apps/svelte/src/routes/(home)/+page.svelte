<script lang="ts">
	import { getScheduleState } from '$lib/store/schedule.svelte';
	import { getPreviousTuesdayString } from '@iracing-schedule/utils';
	import SchedulePage from '$lib/templates/schedule-page.svelte';
	import type { WeekSchedule } from '@iracing-schedule/data';

	let schedule = getScheduleState();

	let { data } = $props();

	let column = $state(data.column);
	let favorite = $state(data.favorite);
	let filter = $state(data.filter);

	let weekSchedule: WeekSchedule = $derived(data.schedule[getPreviousTuesdayString(schedule.date)]);
</script>

<SchedulePage {column} data={weekSchedule} {favorite} {filter} title="Schedule" />
