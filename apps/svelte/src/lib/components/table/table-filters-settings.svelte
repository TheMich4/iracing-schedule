<script lang="ts">
	import { IconSettings } from '@tabler/icons-svelte';
	import TableFiltersButton from './table-filters-button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<TableFiltersButton>
			<IconSettings class="size-4 opacity-60" />
			<span>View Settings</span>
		</TableFiltersButton>
	</Dialog.Trigger>

	<Dialog.Content>
		<Dialog.Title>Settings</Dialog.Title>
	</Dialog.Content>
</Dialog.Root>
