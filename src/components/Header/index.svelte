<script>
	import TopImage from './TopImage.svelte';
	import Nav from './Nav.svelte';

	export let segment;
</script>

<TopImage />
<Nav {segment}/>
