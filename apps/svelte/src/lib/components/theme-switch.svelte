<script lang="ts">
	import Sun from 'svelte-radix/Sun.svelte';
	import Moon from 'svelte-radix/Moon.svelte';
	import { toggleMode, mode } from 'mode-watcher';
</script>

<button
	on:click={toggleMode}
	class="flex w-full flex-row items-center justify-items-start gap-2 rounded-md px-2 py-1 text-sm font-medium transition-all hover:bg-muted-foreground/10"
>
	{#if $mode === 'dark'}
		<Moon class="rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
	{:else}
		<Sun class="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
	{/if}
	<span>Toggle theme</span>
</button>
