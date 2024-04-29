<script lang="ts">
	import TableBody from '$lib/components/table/table-body.svelte';
	import type { Column } from '@/templates/column';
	import TableHeader from './table-header.svelte';
	import type { FavoriteState } from '@/config/favorite';
	import type { SortingState } from '@/config/sorting';

	type Props = {
		columns: Array<Column>;
		favorite: FavoriteState;
		rows: Array<Record<string, any>>;
		sorting: SortingState;
	};

	let { columns, favorite, rows, sorting }: Props = $props();
</script>

<div class="h-full w-full">
	<table class="w-full min-w-[825px] table-fixed border-collapse text-xs">
		<TableHeader {columns} {sorting} />

		<TableBody {columns} {favorite} {rows} />
	</table>
</div>
