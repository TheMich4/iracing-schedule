<script lang="ts">
	import { cn } from '../lib/utils';

	export let columns: any[] = [];
	export let rows: any[] = [];
</script>

<tbody>
	{#each rows as row}
		<tr class="border-b">
			{#each columns as column (column.id)}
				<td class="border-r last:border-r-0">
					<div class={cn('flex items-center gap-2 p-2', column.contentClass)}>
						{column.getValue(row)}
					</div>
				</td>
			{/each}
		</tr>
	{/each}
</tbody>
