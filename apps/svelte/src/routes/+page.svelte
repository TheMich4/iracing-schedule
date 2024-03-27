<script lang="ts">
	import PageHeader from '@/components/page-header';
	import { IconCar, IconLayoutSidebarLeftExpand, IconMinusVertical } from '@tabler/icons-svelte';
	import Content from './content.svelte';

	import sidebar from '$lib/store/sidebar.svelte.js';

	export let data;
</script>

<PageHeader>
	<div class="flex items-center gap-2">
		{#if !sidebar.isOpen}
			<div class="flex items-center gap-2 md:hidden">
				<button
					class="flex items-center opacity-60 transition hover:opacity-100 md:hidden"
					on:click={sidebar.toggle}
				>
					<IconLayoutSidebarLeftExpand />
				</button>
				<IconMinusVertical class="opacity-30" />
			</div>
		{/if}

		{#if sidebar.isCollapsed}
			<div class="hidden items-center gap-2 md:flex">
				<button
					class="flex items-center opacity-60 transition hover:opacity-100"
					on:click={sidebar.toggleCollapse}
				>
					<IconLayoutSidebarLeftExpand class="size-4" />
				</button>
				<IconMinusVertical class="size-4 opacity-30" />
			</div>
		{/if}

		<div class="flex items-center gap-1">
			<IconCar class="size-5" />
			<span class="font-semibold">Cars</span>
		</div>
	</div>
</PageHeader>

<div class="h-full flex-1">
	<Content weekData={data.weekData} />
</div>
