<script>
	// import {
	// 	IconArrowsDownUp,
	// 	IconChevronDown,
	// 	IconFilter,
	// 	IconMinusVertical,
	// 	IconPlus,
	// 	IconSettings,
	// 	IconTable
	// } from '@tabler/icons-svelte';
	// import TableFiltersButton from './table-filters-button.svelte';

	import schedule from '$lib/store/schedule.svelte';
</script>

<div class="flex items-center justify-between px-4 py-3">
	<div class="flex items-center justify-center gap-2">
		<input
			class="shadown-sm placeholder:text-muted-foreground h-[30px] w-[250px] rounded-lg border border-stone-200/70 px-2 text-xs font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-200 disabled:cursor-not-allowed disabled:opacity-50"
			placeholder="Filter..."
			bind:value={schedule.filter}
		/>
		<!-- <TableFiltersButton>
			<IconTable class="size-4 opacity-60" />
			<span>Table View</span>
			<IconChevronDown class="size-3" />
		</TableFiltersButton>
		<TableFiltersButton>
			<IconFilter class="size-4 opacity-60" />
			<span>Filter</span>
			<span class="h-4 rounded-md bg-blue-200/50 px-1 text-[10px]"> 2 </span>
		</TableFiltersButton>
		<TableFiltersButton>
			<IconArrowsDownUp class="size-4 opacity-60" />
			<span>Sort</span>
		</TableFiltersButton> -->
	</div>
	<!-- <div class="hidden items-center gap-2 md:flex">
		<TableFiltersButton>
			<IconSettings class="size-4 opacity-60" />
			<span>View Settings</span>
		</TableFiltersButton>
		<TableFiltersButton>
			<IconPlus class="size-4 opacity-60" />
			<span>Import export</span>
			<IconMinusVertical class="size-3 opacity-30" />
			<IconChevronDown class="size-3 opacity-60" />
		</TableFiltersButton>
	</div> -->
</div>
