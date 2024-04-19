<script lang="ts">
	import { IconLayoutSidebarLeftCollapse } from '@tabler/icons-svelte';

	export let toggleCollapse: () => void;
	export let toggle: () => void;
</script>

<div class="flex items-center justify-between gap-4 px-2">
	<div class="flex items-center gap-2">
		<div
			class="flex size-6 items-center justify-center rounded-md bg-gray-700 text-sm text-white dark:bg-muted-foreground/20"
		>
			is
		</div>
		<button class="flex items-center gap-1 text-sm font-semibold">
			iracing schedule
			<!-- <IconCaretDownFilled class="size-3" /> -->
		</button>
	</div>

	<button class="opacity-60 transition hover:opacity-100 md:hidden">
		<IconLayoutSidebarLeftCollapse class="size-4" on:click={toggle} />
	</button>

	<button class="hidden opacity-60 transition hover:opacity-100 md:block" on:click={toggleCollapse}>
		<IconLayoutSidebarLeftCollapse class="size-4" />
	</button>
</div>
