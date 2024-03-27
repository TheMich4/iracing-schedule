<script lang="ts">
	export let columns: any[] = [];
	export let rows: any[] = [];

	console.log({ columns, rows });
</script>

<tbody>
	{#each rows as row}
		<tr class="border-b">
			{#each columns as column (column.id)}
				<td class="border-r last:border-r-0">
					<div class="flex items-center gap-2 p-2">{column.id}</div>
				</td>
			{/each}
		</tr>
	{/each}
</tbody>
