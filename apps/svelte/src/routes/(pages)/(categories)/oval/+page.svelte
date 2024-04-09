<script lang="ts">
	import SchedulePage from '@/templates/schedule-page.svelte';
	import { getScheduleState } from '$lib/store/schedule.svelte';
	import { getPreviousTuesdayString } from '@iracing-schedule/utils';

	let schedule = getScheduleState();

	let { data } = $props();

	let weekData = $derived(
		data.schedule[getPreviousTuesdayString(schedule.date)]?.filter(
			(item) => item.category === 'oval'
		)
	);
</script>

<SchedulePage title="Oval" data={weekData} />
