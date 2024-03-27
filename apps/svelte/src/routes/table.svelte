<script lang="ts">
	import { cn } from '../lib/utils';
	import { columns } from './columns';
	import TableBody from './table-body.svelte';

	export let weekData: Array<Record<string, any>>;
</script>

<table class="w-full min-w-[825px] table-fixed border-collapse text-xs">
	<thead class="sticky top-0 z-[10] bg-white">
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

	<TableBody {columns} rows={[weekData[0]]} />
</table>
