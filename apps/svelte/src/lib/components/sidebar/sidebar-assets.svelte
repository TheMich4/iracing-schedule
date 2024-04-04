<script lang="ts">
	import { IconCar, IconRoad, IconUsersGroup } from '@tabler/icons-svelte';
	import SidebarAccordion from './sidebar-accordion.svelte';
</script>

<SidebarAccordion label="Assets" value="assets">
	<a
		class="flex items-center gap-2 rounded-md bg-stone-900/5 px-2 py-1 text-sm font-medium"
		href="/cars"
	>
		<IconCar class="size-4 opacity-70" />
		<span>Cars</span>
	</a>
	<a class="flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium" href="/series">
		<IconUsersGroup class="size-4 opacity-70" />
		<span>Series</span>
	</a>
	<a class="flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium" href="/tracks">
		<IconRoad class="size-4 opacity-70" />
		<span>Tracks</span>
	</a>
</SidebarAccordion>
