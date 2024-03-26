<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion';

	export let label: string;
	export let value: string;
</script>

<Accordion.Item {value} class="flex flex-col gap-2 border-b-0">
	<Accordion.Trigger asChild>
		<button class="group flex items-center gap-2 px-2 text-sm opacity-60">
			<span class="text-xs font-semibold">{label}</span>
		</button>
	</Accordion.Trigger>

	<Accordion.Content
		class="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp flex flex-col gap-2 overflow-hidden"
	>
		<slot />
	</Accordion.Content>
</Accordion.Item>
