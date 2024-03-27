<script lang="ts">
	import TableFilters from './table-filters.svelte';
	import Table from './table.svelte';

	export let weekData: Array<Record<string, any>>;
</script>

<div class="flex h-full flex-col">
	<TableFilters />

	<div class="relative flex-1">
		<div class="h-full w-full overflow-auto px-4">
			<Table {weekData} />
		</div>
	</div>
</div>
