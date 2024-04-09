<script lang="ts">
	import FreeIcon from '../free-icon.svelte';
	import type { WeekEntry } from '@iracing-schedule/data';
	import type { Column } from '@/templates/column';

	export let column: Column;
	export let row: WeekEntry;

	const track: string = column.getValue(row);
</script>

<div class="group flex flex-row flex-wrap items-baseline gap-1 text-wrap">
	{#if row.track.isFree}
		<FreeIcon />
	{/if}

	{track}
</div>
