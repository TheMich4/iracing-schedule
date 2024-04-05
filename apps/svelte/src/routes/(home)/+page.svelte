<script lang="ts">
	import { getScheduleState } from '$lib/store/schedule.svelte';
	import { getPreviousTuesdayString } from '@iracing-schedule/utils';
	import SchedulePage from '$lib/templates/schedule-page.svelte';

	let schedule = getScheduleState();

	let { data } = $props();

	let weekData = $derived(data.schedule[getPreviousTuesdayString(schedule.date)]);
</script>

<SchedulePage data={weekData} title="Schedule" />
