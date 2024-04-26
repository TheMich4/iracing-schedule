<script lang="ts">
	import TableBody from '$lib/components/table/table-body.svelte';
	import TableHeader from './table-header.svelte';

	export let columns: Array<Record<string, any>>;
	export let favorite;
	export let rows: Array<Record<string, any>>;
</script>

<table class="h-full w-full min-w-[825px] table-fixed border-collapse text-xs">
	<TableHeader {columns} />

	<TableBody {columns} {favorite} {rows} />
</table>
