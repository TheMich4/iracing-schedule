<script lang="ts">
	import PageHeader from '@/components/page-header';
	import {
		IconCalendarEvent,
		IconLayoutSidebarLeftExpand,
		IconMinusVertical
	} from '@tabler/icons-svelte';

	import sidebar from '$lib/store/sidebar.svelte.js';
	import Table from '$lib/components/table/table.svelte';
	import { columns } from './columns';
	import TableFilters from './table-filters.svelte';

	export let data;
</script>

<div class="h-screen">
	<PageHeader>
		<div class="flex items-center gap-2">
			{#if !sidebar.isOpen}
				<div class="flex items-center gap-2 md:hidden">
					<button
						class="flex items-center opacity-60 transition hover:opacity-100 md:hidden"
						on:click={sidebar.toggle}
					>
						<IconLayoutSidebarLeftExpand class="size-4" />
					</button>
					<IconMinusVertical class="opacity-30" />
				</div>
			{/if}

			{#if sidebar.isCollapsed}
				<div class="hidden items-center gap-2 md:flex">
					<button
						class="flex items-center opacity-60 transition hover:opacity-100"
						on:click={sidebar.toggleCollapse}
					>
						<IconLayoutSidebarLeftExpand class="size-4" />
					</button>
					<IconMinusVertical class="size-4 opacity-30" />
				</div>
			{/if}

			<div class="flex items-center gap-1">
				<IconCalendarEvent class="size-4" />
				<span class="font-semibold">Schedule</span>
			</div>
		</div>
	</PageHeader>

	<div class="h-[calc(100%-42px)] flex-1 overflow-hidden">
		<div class="flex h-full flex-col">
			<TableFilters />

			<div class="relative h-full w-full flex-1 overflow-auto px-4">
				<Table rows={data.weekData} {columns} />
			</div>
		</div>
	</div>
</div>
