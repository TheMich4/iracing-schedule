<script lang="ts">
	import { IconRoad, IconUsersGroup } from '@tabler/icons-svelte';
	import SidebarAccordion from './sidebar-accordion.svelte';
	import OvalIcon from '$lib/icons/oval-icon.svelte';
	import SportsCarIcon from '../../icons/sports-car-icon.svelte';
	import FormulaCarIcon from '../../icons/formula-car-icon.svelte';
	import DirtOvalIcon from '../../icons/dirt-oval-icon.svelte';
	import DirtRoadIcon from '../../icons/dirt-road-icon.svelte';
</script>

<SidebarAccordion label="Categories" value="categories">
	<div class="">
		<a
			class="flex items-center gap-2 rounded-md bg-stone-900/5 px-2 py-1 text-sm font-medium"
			href="/oval"
		>
			<svelte:component this={OvalIcon} />
			<span>Oval</span>
		</a>
		<a class="flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium" href="/sports-car">
			<svelte:component this={SportsCarIcon} />
			<span>Sports Car</span>
		</a>
		<a class="flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium" href="/formula-car">
			<svelte:component this={FormulaCarIcon} />
			<span>Formula Car</span>
		</a>
		<a class="flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium" href="/dirt-oval">
			<svelte:component this={DirtOvalIcon} />
			<span>Dirt Oval</span>
		</a>
		<a class="flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium" href="/dirt-road">
			<svelte:component this={DirtRoadIcon} />
			<span>Dirt Road</span>
		</a>
	</div>
</SidebarAccordion>

<style lang="pcss">
	:global(svg) {
		@apply size-4 opacity-70;
	}
</style>
