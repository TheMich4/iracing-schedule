<script lang="ts">
	import { IconCar } from '@tabler/icons-svelte';
	import SidebarAccordion from './sidebar-accordion.svelte';
</script>

<SidebarAccordion label="Assets" value="assets">
	<a
		class="flex items-center gap-2 rounded-md bg-stone-900/5 px-2 py-1 text-sm font-medium"
		href="#"
	>
		<IconCar class="size-4 opacity-70" />
		<span>Cars</span>
	</a>
	<a class="flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium" href="#">
		<IconCar class="size-4 opacity-70" />
		<span>Track</span>
	</a>
	<a class="flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium" href="#">
		<IconCar class="size-4 opacity-70" />
		<span>Series</span>
	</a>
</SidebarAccordion>
