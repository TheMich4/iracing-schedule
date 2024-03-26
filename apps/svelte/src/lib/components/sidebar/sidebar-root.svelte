<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { cn } from '$lib/utils';
	import SidebarHeader from './sidebar-header.svelte';
	import SidebarSearch from './sidebar-search.svelte';
	import SidebarQuickActions from './sidebar-quick-actions.svelte';
	import * as Accordion from '$lib/components/ui/accordion';
	import SidebarAssets from './sidebar-assets.svelte';
	import SidebarLists from './sidebar-lists.svelte';
	import SidebarSheet from './sidebar-sheet.svelte';

	let isCollapsed = false;
</script>

<SidebarSheet>
	<ScrollArea
		class={cn(
			'flex h-dvh flex-col gap-2 overflow-hidden border-r-[1px] border-stone-200 bg-stone-50',
			isCollapsed ? 'w-0' : 'w-full'
		)}
	>
		<div class="sticky top-0 z-10 border-b-[1px] border-stone-200 bg-stone-50 p-2">
			<SidebarHeader />
		</div>

		<div class="p-2">
			<SidebarSearch />
		</div>

		<div class="mb-4 p-2">
			<SidebarQuickActions />
		</div>

		<Accordion.Root multiple={true} value={['assets', 'lists']}>
			<div class="p-2">
				<SidebarAssets />
			</div>
			<div class="p-2">
				<SidebarLists />
			</div>
		</Accordion.Root>
	</ScrollArea>
</SidebarSheet>
