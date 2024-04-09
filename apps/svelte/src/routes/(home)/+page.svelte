<script lang="ts">
	import { getScheduleState } from '$lib/store/schedule.svelte';
	import { getPreviousTuesdayString } from '@iracing-schedule/utils';
	import SchedulePage from '$lib/templates/schedule-page.svelte';
	import type { WeekSchedule } from '@iracing-schedule/data';

	let schedule = getScheduleState();

	let { data } = $props();

	let weekSchedule: WeekSchedule = $derived(data.schedule[getPreviousTuesdayString(schedule.date)]);
</script>

<SchedulePage data={weekSchedule} title="Schedule" />
