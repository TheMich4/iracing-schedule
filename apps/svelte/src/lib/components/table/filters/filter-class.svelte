<script lang="ts">
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import { Badge } from '@/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { IconPlus } from '@tabler/icons-svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { LicenseColors, LicenseGroup, LicenseGroupNames } from '@/license';
	import type { FilterState } from '@/config/filter';

	type Props = {
		filter: FilterState;
	};

	let { filter }: Props = $props();

	let title = 'Class';

	let licenses = Object.values(LicenseGroup).filter((x) => typeof x === 'number');

	const handleCheckedChange = async (option: number, checked: boolean) => {
		filter.class = checked
			? [...filter.class, option]
			: filter.class.filter((x: number) => x !== option);

		await fetch('/api/session/filter', {
			method: 'PUT',
			body: JSON.stringify({ id: 'class', newFilter: filter.class })
		});
	};
</script>

<Popover.Root>
	<Popover.Trigger asChild={true} let:builder>
		<Button builders={[builder]} class="border-dashed text-foreground" size="sm" variant="outline">
			<IconPlus class="mr-2 size-3" />
			<span>{title}</span>

			{#if filter.class?.length > 0}
				<Separator class="mx-2 h-4" orientation="vertical" />

				<Badge class="rounded-sm px-1 font-normal lg:hidden" variant="secondary">
					{filter.class.length}
				</Badge>
				<div class="hidden space-x-1 lg:flex">
					{#if filter.class.length > 2}
						<Badge class="rounded-sm px-1 font-normal" variant="secondary">
							{filter.class.length} selected</Badge
						>
					{:else}
						{#each filter.class as license}
							<Badge class="rounded-sm px-1 font-normal" variant="secondary">
								{LicenseGroupNames[license]}
							</Badge>
						{/each}
					{/if}
				</div>
			{/if}
		</Button>
	</Popover.Trigger>

	<Popover.Content class="w-[200px] p-0" align="start">
		<Command.Root>
			<Command.Input placeholder={title} />
			<Command.List>
				<Command.Empty>No results found.</Command.Empty>

				<Command.Group>
					{#each licenses as license}
						<Command.Item class="flex flex-row gap-2">
							{@const color = LicenseColors[license]}
							{@const name = LicenseGroupNames[license]}
							<Checkbox
								checked={filter.class.includes(license)}
								onCheckedChange={(checked) => handleCheckedChange(license, checked as boolean)}
							/>

							<div
								class="flex size-4 items-center justify-center rounded-sm border border-{color}-400/80 bg-{color}-200/40 text-{color}-800 text-xs dark:text-{color}-400/80 dark:bg-{color}-800/20 dark:border-{color}-800"
							>
								{name.charAt(0)}
							</div>

							<span>{name}</span>

							<span class="ml-auto flex size-4 items-center justify-center font-mono text-xs"
								>0</span
							>
						</Command.Item>
					{/each}

					{#if filter.class.length > 0}
						<Command.Separator />
						<Command.Group>
							<Command.Item class="flex justify-center text-center">Clear filters</Command.Item>
						</Command.Group>
					{/if}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
