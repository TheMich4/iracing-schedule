<script lang="ts">
	import { IconSettings } from '@tabler/icons-svelte';
	import TableFiltersButton from './table-filters-button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import type { Column } from '@/templates/column';
	import { Checkbox } from '../ui/checkbox';
	import type { ColumnState } from '@/config/column';

	type Props = {
		columns: Column[];
		columnState: ColumnState;
	};

	let { columns, columnState }: Props = $props();

	const handleVisibilityChange = async (columnId: string, checked: boolean) => {
		columnState.visibility[columnId] = checked;

		await fetch('/api/session/column', {
			method: 'PUT',
			body: JSON.stringify({ id: columnId, checked })
		});
	};
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<TableFiltersButton>
			<IconSettings class="size-4 opacity-60" />
			<span>View Settings</span>
		</TableFiltersButton>
	</Dialog.Trigger>

	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Settings</Dialog.Title>
			<Dialog.Description>Customize your view</Dialog.Description>
		</Dialog.Header>

		<div class="flex flex-col gap-1 px-2">
			{#each columns as column (column.id)}
				<div class="flex items-center gap-1 space-x-2">
					<Checkbox
						id={column.id}
						checked={columnState.visibility[column.id] !== false}
						onCheckedChange={(checked) => handleVisibilityChange(column.id, checked as boolean)}
					/>
					<label for={column.id}>{column.label}</label>
				</div>
			{/each}
		</div>
	</Dialog.Content>
</Dialog.Root>
