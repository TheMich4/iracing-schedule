<script lang="ts">
	import {
		IconDotsVertical,
		IconCalendarEvent,
		IconLayoutSidebarLeftExpand,
		IconMinusVertical
	} from '@tabler/icons-svelte';

	import sidebar from '$lib/store/sidebar.svelte';

	export let title: string;
</script>

<div class="border-b-[1px] border-stone-200 p-2 px-4">
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-2">
			<div class="flex items-center gap-2">
				{#if !sidebar.isOpen}
					<div class="flex items-center gap-2 md:hidden">
						<button
							class="flex items-center opacity-60 transition hover:opacity-100 md:hidden"
							on:click={sidebar.toggle}
						>
							<IconLayoutSidebarLeftExpand class="size-4" />
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
					<IconCalendarEvent class="size-4" />
					<span class="font-semibold">{title}</span>
				</div>
			</div>
		</div>

		<div class="flex items-center gap-2">
			<button class="flex h-[24px] w-[24px] items-center justify-center rounded-full">
				<IconDotsVertical class="size-3" />
			</button>
		</div>
	</div>
</div>
