<script lang="ts">
	import SchedulePage from '@/templates/schedule-page.svelte';
	import { getScheduleState } from '$lib/store/schedule.svelte';
	import { getPreviousTuesdayString } from '@iracing-schedule/utils';
	import { categoryToName } from '@iracing-schedule/data';

	let schedule = getScheduleState();

	let { data } = $props();

	let column = $state(data.column);
	let favorite = $state(data.favorite);

	let weekData = $derived(
		data.schedule[getPreviousTuesdayString(schedule.date)]?.filter(
			(item) => item.category === data.category
		)
	);
</script>

<SchedulePage title={categoryToName[data.category]} {column} data={weekData} {favorite} />
