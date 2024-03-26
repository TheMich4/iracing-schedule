<script>
	import TableFilters from './table-filters.svelte';
	import Table from './table.svelte';
</script>

<div class="flex h-full flex-col">
	<TableFilters />

	<div class="relative flex-1">
		<div class="absolute h-full w-full overflow-scroll px-4">
			<Table />
		</div>
	</div>
</div>
