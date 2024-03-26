<script lang="ts">
	import { IconCaretDownFilled, IconLayoutSidebarLeftCollapse } from '@tabler/icons-svelte';

	const collapseSidebar = () => {};
	const toggleSidebar = () => {};
</script>

<div class="flex items-center justify-between gap-4 px-2">
	<div class="flex items-center gap-2">
		<div class="flex size-6 items-center justify-center rounded-md bg-gray-700 text-white">I</div>
		<button class="flex items-center gap-1 text-sm font-semibold">
			iracing schedule
			<IconCaretDownFilled class="size-3" />
		</button>
	</div>

	<button class="opacity-60 transition hover:opacity-100 md:hidden">
		<IconLayoutSidebarLeftCollapse class="size-4" on:click={toggleSidebar} />
	</button>

	<button
		class="hidden opacity-60 transition hover:opacity-100 md:block"
		on:click={collapseSidebar}
	>
		<IconLayoutSidebarLeftCollapse class="size-4" />
	</button>
</div>
