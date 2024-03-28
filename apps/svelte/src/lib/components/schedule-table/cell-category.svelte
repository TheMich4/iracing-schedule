<script lang="ts">
	import { Categories } from '$lib/category';
	import OvalIcon from '$lib/icons/oval-icon.svelte';
	import SportsCarIcon from '$lib/icons/sports-car-icon.svelte';
	import DirtOvalIcon from '$lib/icons/dirt-oval-icon.svelte';
	import DirtRoadIcon from '$lib/icons/dirt-road-icon.svelte';

	export let column: Record<string, any>;
	export let row: Record<string, any>;

	const category: string = column.getValue(row);
	console.log({ category });
</script>

<div class="category flex flex-row items-center gap-1">
	{#if category === Categories.OVAL}
		<svelte:component this={OvalIcon} />
	{:else if category === Categories.ROAD}
		<svelte:component this={SportsCarIcon} />
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
