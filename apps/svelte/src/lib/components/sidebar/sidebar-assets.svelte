<script lang="ts">
	import { IconCar, IconRoad, IconUsersGroup } from '@tabler/icons-svelte';
	import SidebarAccordion from './sidebar-accordion.svelte';
	import { page } from '$app/stores';
	import { cn } from '../../utils';

	$: currentRoute = $page.url.pathname;
</script>

<SidebarAccordion label="Assets" value="assets">
	<a
		class={cn(
			'flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium',
			currentRoute === '/cars' && 'active'
		)}
		href="/cars"
	>
		<IconCar class="size-4 opacity-70" />
		<span>Cars</span>
	</a>
	<a
		class={cn(
			'flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium',
			currentRoute === '/series' && 'active'
		)}
		href="/series"
	>
		<IconUsersGroup class="size-4 opacity-70" />
		<span>Series</span>
	</a>
	<a
		class={cn(
			'flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium',

			currentRoute === '/tracks' && 'active'
		)}
		href="/tracks"
	>
		<IconRoad class="size-4 opacity-70" />
		<span>Tracks</span>
	</a>
</SidebarAccordion>

<style lang="pcss">
	.active {
		@apply bg-stone-900/5;
	}
</style>
