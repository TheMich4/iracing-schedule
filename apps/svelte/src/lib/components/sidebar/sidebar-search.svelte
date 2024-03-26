<script lang="ts">
	import { IconCommand, IconSearch } from '@tabler/icons-svelte';
</script>

<button
	class="flex w-full items-center justify-between rounded-lg border border-stone-200/70 bg-white px-2 py-1 text-sm shadow-sm"
>
	<div class="flex items-center gap-2">
		<IconSearch class="size-3" />
		<span>Search</span>
	</div>

	<div class="flex items-center gap-1 opacity-60">
		<IconCommand class="size-3" />
		<span class="px-[1px] text-[0.75rem]">K</span>
	</div>
</button>
