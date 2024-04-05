<script lang="ts">
	import PageHeader from '@/components/page-header/page-header.svelte';
	import TableFilters from '@/components/table/table-filters.svelte';
	import Table from '@/components/table/table.svelte';
	import { columns } from './schedule-page-columns';

	export let data: Array<Record<string, any>> = [];
	export let title: string;
</script>

<div class="h-screen">
	<PageHeader {title} />

	<div class="h-[calc(100%-42px)] flex-1 overflow-hidden">
		<div class="flex h-full flex-col">
			<TableFilters />

			<div class="relative h-full w-full flex-1 overflow-auto px-4">
				<Table rows={data} {columns} />
			</div>
		</div>
	</div>
</div>
