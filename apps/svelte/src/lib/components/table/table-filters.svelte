<script lang="ts">
	import DatePicker from '$lib/components/date-picker.svelte';
	import { getScheduleState } from '$lib/store/schedule.svelte';
	import type { Column } from '@/templates/column';
	import TableFiltersSettings from './table-filters-settings.svelte';
	import type { ColumnState } from '@/config/column';
	import { FilterClass } from './filters';
	import type { FilterState } from '@/config/filter';
	import type { SortingState } from '@/config/sorting';

	type Props = {
		columns: Column[];
		columnState: ColumnState;
		filter: FilterState;
		sorting: SortingState;
	};

	let { columns, columnState, filter }: Props = $props();

	const schedule = getScheduleState();
</script>

<div class="flex items-center justify-between px-4 py-3">
	<div class="flex items-center justify-center gap-2">
		<!-- <input
			class="shadown-sm placeholder:text-muted-foreground h-[30px] w-[250px] rounded-lg border border-stone-200/70 px-2 text-xs font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-200 disabled:cursor-not-allowed disabled:opacity-50"
			placeholder="Filter..."
			bind:value={schedule.filter}
			type="text"
		/> -->
		<DatePicker
			class="border-ston-200 h-[30px] text-xs font-normal tracking-tight shadow-sm"
			bind:value={schedule.date}
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

		<FilterClass {filter} />
	</div>
	<div class="hidden items-center gap-2 md:flex">
		<TableFiltersSettings {columns} {columnState} />
		<!-- <TableFiltersButton>
			<IconPlus class="size-4 opacity-60" />
			<span>Import export</span>
			<IconMinusVertical class="size-3 opacity-30" />
			<IconChevronDown class="size-3 opacity-60" />
		</TableFiltersButton> -->
	</div>
</div>
