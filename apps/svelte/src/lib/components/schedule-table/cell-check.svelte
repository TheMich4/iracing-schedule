<script lang="ts">
	import { IconCheck } from '@tabler/icons-svelte';
	import type { Column } from '@/templates/column';
	import type { WeekEntry } from '@iracing-schedule/data';

	export let column: Column;
	export let row: WeekEntry;

	$: isChecked = column.getValue(row);
</script>

{#if isChecked}
	<IconCheck class="size-3" />
{/if}
