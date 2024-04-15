<script lang="ts">
	import { cn } from '@/utils';

	export let columns: Array<Record<string, any>>;
</script>

<thead class="sticky -top-[1px] z-[10] border-y bg-background">
	<tr class="w-full border-y">
		{#each columns as column (column.id)}
			<td class={cn('border-r last:border-r-0', column.class)}>
				<div class="flex items-center gap-1 p-2 text-sm font-normal">
					<svelte:component this={column.Icon} class="size-4 opacity-60" />
					<span class="opacity-70">{column.label}</span>
				</div>
			</td>
		{/each}
	</tr>
</thead>
