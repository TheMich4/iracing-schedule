<script lang="ts">
	import PageHeader from '@/components/page-header';
	import Table from '$lib/components/table/table.svelte';
	import { columns } from './columns';
	import TableFilters from '$lib/components/table/table-filters.svelte';
	import { getScheduleState } from '$lib/store/schedule.svelte';
	import { getPreviousTuesdayString } from '@iracing-schedule/utils';

	let schedule = getScheduleState();

	let { data } = $props();

	let weekData = $derived(data.schedule[getPreviousTuesdayString(schedule.date)]);
</script>

<div class="h-screen">
	<PageHeader title="Schedule" />

	<div class="h-[calc(100%-42px)] flex-1 overflow-hidden">
		<div class="flex h-full flex-col">
			<TableFilters />

			<div class="relative h-full w-full flex-1 overflow-auto px-4">
				<Table rows={weekData} {columns} />
			</div>
		</div>
	</div>
</div>
