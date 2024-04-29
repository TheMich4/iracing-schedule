<script lang="ts">
	import PageHeader from '@/components/page-header/page-header.svelte';
	import TableFilters from '@/components/table/table-filters.svelte';
	import Table from '@/components/table/table.svelte';
	import { columns as defaultColumns } from './schedule-page-columns';
	import type { ColumnState } from '$lib/config/column';
	import type { FavoriteState } from '$lib/config/favorite';
	import type { FilterState } from '@/config/filter';

	type Props = {
		column: ColumnState;
		data: Array<Record<string, any>>;
		favorite: FavoriteState;
		filter: FilterState;
		title: string;
	};

	let { column, data, favorite, filter, title }: Props = $props();

	let columns = $derived(defaultColumns.filter((col) => column.visibility[col.id] !== false));
</script>

<div class="h-screen">
	<PageHeader {title} />

	<div class="h-[calc(100%-42px)] flex-1 overflow-hidden">
		<div class="flex h-full flex-col">
			<TableFilters columns={defaultColumns} columnState={column} {filter} />

			<div class="relative h-full w-full flex-1 overflow-auto px-4">
				<Table rows={data} {columns} {favorite} />
			</div>
		</div>
	</div>
</div>
