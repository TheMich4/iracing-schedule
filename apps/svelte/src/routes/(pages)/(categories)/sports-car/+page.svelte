<script lang="ts">
	import SchedulePage from '@/templates/schedule-page.svelte';
	import { getScheduleState } from '$lib/store/schedule.svelte';
	import { getPreviousTuesdayString } from '@iracing-schedule/utils';

	let schedule = getScheduleState();

	let { data } = $props();

	console.log({data})

	let weekData = $derived(
		data.schedule[getPreviousTuesdayString(schedule.date)]?.filter(
			(item) => item.category === 'sports_car'
		)
	);
</script>

<SchedulePage title="Sports Car" data={weekData} />
