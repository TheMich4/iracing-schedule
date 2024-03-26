<script lang="ts">
	import PageHeader from '@/components/page-header';
	import { IconCar, IconLayoutSidebarLeftExpand, IconMinusVertical } from '@tabler/icons-svelte';

	let isSidebarOpen = true;
	let isSidebarCollapsed = false;

	const setSidebarOpen = () => {};
	const setSidebarCollapsed = () => {};
</script>

<div>
	<PageHeader>
		<div class="flex items-center gap-2">
			{#if !isSidebarOpen}
				<div class="flex items-center gap-2 md:hidden">
					<button
						class="flex items-center opacity-60 transition hover:opacity-100 md:hidden"
						on:click={setSidebarOpen}
					>
						<IconLayoutSidebarLeftExpand />
					</button>
					<IconMinusVertical class="opacity-30" />
				</div>
			{/if}

			{#if isSidebarCollapsed}
				<div class="hidden items-center gap-2 md:flex">
					<button
						class="flex items-center opacity-60 transition hover:opacity-100"
						on:click={setSidebarCollapsed}
					>
						<IconLayoutSidebarLeftExpand />
					</button>
					<IconMinusVertical class="opacity-30" />
				</div>
			{/if}

			<div class="flex items-center gap-1">
				<IconCar />
				<span class="font-semibold">Cars</span>
			</div>
		</div>
	</PageHeader>

	<div class="min-w-[800px] flex-1 bg-red-200">xxxx</div>
</div>
