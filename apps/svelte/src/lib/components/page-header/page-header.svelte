<script>
	import { IconDotsVertical } from '@tabler/icons-svelte';
</script>

<div class="border-b-[1px] border-stone-200 p-2 px-4">
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-2">
			<slot />
		</div>

		<div class="flex items-center gap-2">
			<button class="flex h-[24px] w-[24px] items-center justify-center rounded-full">
				<IconDotsVertical class="size-3" />
			</button>
		</div>
	</div>
</div>
