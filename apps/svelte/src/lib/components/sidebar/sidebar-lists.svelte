<script lang="ts">
	import { IconPlus } from '@tabler/icons-svelte';
	import SidebarAccordion from './sidebar-accordion.svelte';
</script>

<SidebarAccordion label="Lists" value="lists">
	<a href="#" class="flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium">
		<span>🚗</span>
		<span>Sports Car</span>
	</a>
	<a href="#" class="flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium">
		<span>🏎️</span>
		<span>Formula Car</span>
	</a>

	<button
		class="flex items-center gap-1 rounded-md px-3 py-1 text-xs opacity-60 transition hover:opacity-80"
	>
		<IconPlus class="size-3" /><span>Create list</span>
	</button>
</SidebarAccordion>
