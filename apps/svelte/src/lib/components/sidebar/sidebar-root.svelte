<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { cn } from '$lib/utils';
	import SidebarHeader from './sidebar-header.svelte';
	import SidebarSearch from './sidebar-search.svelte';
	import SidebarQuickActions from './sidebar-quick-actions.svelte';
	import * as Accordion from '$lib/components/ui/accordion';
	import SidebarAssets from './sidebar-assets.svelte';
	// import SidebarLists from './sidebar-lists.svelte';
	import SidebarSheet from './sidebar-sheet.svelte';
	import SidebarCategories from './sidebar-categories.svelte';

	import sidebar from '$lib/store/sidebar.svelte.js';
	import ThemeSwitch from '../theme-switch.svelte';
</script>

<SidebarSheet open={sidebar.isOpen} onOpenChange={(v) => sidebar.setIsOpen(v)}>
	<ScrollArea
		class={cn(
			'flex h-dvh flex-col justify-between gap-2 overflow-hidden border-r-[1px] border-border bg-stone-50 dark:bg-background',
			sidebar.isCollapsed ? 'w-0' : 'w-full'
		)}
	>
		<div class="flex flex-col">
			<div
				class="sticky top-0 z-10 border-b-[1px] border-border bg-stone-50 p-2 dark:bg-background"
			>
				<SidebarHeader toggleCollapse={sidebar.toggleCollapse} toggle={sidebar.toggle} />
			</div>

			<!-- <div class="mt-1 p-2">
			<SidebarSearch />
		</div> -->

			<div class="p-2">
				<SidebarQuickActions />
			</div>

			<Accordion.Root multiple={true} value={['categories', 'assets', 'lists']}>
				<div class="p-2">
					<SidebarCategories />
				</div>
				<div class="p-2">
					<SidebarAssets />
				</div>
				<!-- <div class="p-2">
				<SidebarLists />
			</div> -->
			</Accordion.Root>
		</div>

		<div class="p-2">
			<ThemeSwitch />
		</div>
	</ScrollArea>
</SidebarSheet>
