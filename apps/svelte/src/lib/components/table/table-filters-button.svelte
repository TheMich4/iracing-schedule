<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</script>

<Button
	class="flex h-[30px] items-center gap-1 rounded-lg border border-border px-2 text-xs font-medium shadow-sm"
	variant="outline"
>
	<slot />
</Button>
