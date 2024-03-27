<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import { IconX } from '@tabler/icons-svelte';

	export let open = false;
	export let onOpenChange: (value: boolean) => void;
</script>

<div><slot /></div>

<div class="lg:hidden">
	<Sheet.Root {open} {onOpenChange}>
		<Sheet.Portal>
			<Sheet.Overlay />

			<Sheet.Content class="p-0" side="left">
				<slot />
			</Sheet.Content>

			<!-- <Sheet.Close asChild>
				<button
					aria-label="Close"
					class="absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
					><IconX /></button
				>
			</Sheet.Close> -->
		</Sheet.Portal>
	</Sheet.Root>
</div>
