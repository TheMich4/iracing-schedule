<script lang="ts">
	import TableFilters from './table-filters.svelte';
	import Table from './table.svelte';

	export let weekData: Array<Record<string, any>>;
</script>

<div class="flex h-full flex-col">
	<TableFilters />

	<div class="relative h-full w-full flex-1 overflow-auto px-4">
		<Table {weekData} />
	</div>
</div>
