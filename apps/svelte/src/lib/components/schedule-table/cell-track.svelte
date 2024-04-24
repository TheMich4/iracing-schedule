<script lang="ts">
	import FreeIcon from '../free-icon.svelte';
	import type { WeekEntry } from '@iracing-schedule/data';

	export let row: WeekEntry;

	$: track = row.track;
</script>

<div class="group flex flex-row flex-wrap items-baseline gap-1 text-wrap">
	{#if track.isFree}
		<FreeIcon />
	{/if}

	{track.trackName}
</div>
