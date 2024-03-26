<script>
	import '../app.pcss';
	import '@fontsource-variable/inter';

	import Sidebar from '@/components/sidebar';
</script>

<div class="flex">
	<Sidebar />
	<div class="flex-1">
		<slot />
	</div>
</div>
