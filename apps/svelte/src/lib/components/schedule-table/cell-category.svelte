<script lang="ts">
	import { Categories } from '$lib/category';
	import OvalIcon from '$lib/icons/oval-icon.svelte';
	import SportsCarIcon from '$lib/icons/sports-car-icon.svelte';
	import DirtOvalIcon from '$lib/icons/dirt-oval-icon.svelte';
	import DirtRoadIcon from '$lib/icons/dirt-road-icon.svelte';
	import FormulaCarIcon from '$lib/icons/formula-car-icon.svelte';
	import type { Column } from '@/templates/column';
	import type { WeekEntry } from '@iracing-schedule/data';

	export let column: Column;
	export let row: WeekEntry;

	const category = column.getValue(row);
</script>

<div class="category flex flex-row items-center gap-2">
	{#if category === Categories.OVAL}
		<svelte:component this={OvalIcon} />
	{:else if category === Categories.SPORTS_CAR}
		<svelte:component this={SportsCarIcon} />
	{:else if category === Categories.FORMULA_CAR}
		<svelte:component this={FormulaCarIcon} />
	{:else if category === Categories.DIRT_OVAL}
		<svelte:component this={DirtOvalIcon} />
	{:else if category === Categories.DIRT_ROAD}
		<svelte:component this={DirtRoadIcon} />
	{/if}
	{category}
</div>

<style lang="pcss">
	.category :global(svg) {
		@apply size-3;
	}
</style>
