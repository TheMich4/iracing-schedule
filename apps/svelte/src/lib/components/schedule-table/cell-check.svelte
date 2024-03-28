<script lang="ts">
	import { IconCheck } from '@tabler/icons-svelte';

	export let column: Record<string, any>;
	export let row: Record<string, any>;

	const isChecked: boolean = column.getValue(row);
</script>

{#if isChecked}
	<IconCheck class="size-3" />
{/if}
