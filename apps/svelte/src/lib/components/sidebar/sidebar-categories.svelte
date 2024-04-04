<script lang="ts">
	import SidebarAccordion from './sidebar-accordion.svelte';
	import OvalIcon from '$lib/icons/oval-icon.svelte';
	import SportsCarIcon from '../../icons/sports-car-icon.svelte';
	import FormulaCarIcon from '../../icons/formula-car-icon.svelte';
	import DirtOvalIcon from '../../icons/dirt-oval-icon.svelte';
	import DirtRoadIcon from '../../icons/dirt-road-icon.svelte';
	import { page } from '$app/stores';
	import { cn } from '../../utils';

	$: currentRoute = $page.url.pathname;
</script>

<SidebarAccordion label="Categories" value="categories">
	<a
		class={cn(
			'flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium',
			currentRoute === '/oval' && 'active'
		)}
		href="/oval"
	>
		<svelte:component this={OvalIcon} />
		<span>Oval</span>
	</a>
	<a
		class={cn(
			'flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium',
			currentRoute === '/sports-car' && 'active'
		)}
		href="/sports-car"
	>
		<svelte:component this={SportsCarIcon} />
		<span>Sports Car</span>
	</a>
	<a
		class={cn(
			'flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium',
			currentRoute === '/formula-car' && 'active'
		)}
		href="/formula-car"
	>
		<svelte:component this={FormulaCarIcon} />
		<span>Formula Car</span>
	</a>
	<a
		class={cn(
			'flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium',
			currentRoute === '/dirt-oval' && 'active'
		)}
		href="/dirt-oval"
	>
		<svelte:component this={DirtOvalIcon} />
		<span>Dirt Oval</span>
	</a>
	<a
		class={cn(
			'flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium',
			currentRoute === '/dirt-road' && 'active'
		)}
		href="/dirt-road"
	>
		<svelte:component this={DirtRoadIcon} />
		<span>Dirt Road</span>
	</a>
</SidebarAccordion>

<style lang="pcss">
	:global(svg) {
		@apply size-4 opacity-70;
	}

	.active {
		@apply bg-stone-900/5;
	}
</style>
