<script lang="ts">
	import Sun from 'svelte-radix/Sun.svelte';
	import Moon from 'svelte-radix/Moon.svelte';
	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<Button
	on:click={toggleMode}
	variant="ghost"
	size="icon"
	class="flex w-full flex-row items-center justify-items-start gap-2 px-2 py-1"
>
	<Sun class="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
	<Moon class="rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
	<span>Toggle theme</span>
</Button>
