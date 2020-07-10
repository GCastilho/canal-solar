<script>
	import TopImage from './TopImage.svelte'
	import Nav from './Nav.svelte'

	export let navTree = []
</script>

<style>
	nav {
		background-color: #333333;
		--dropmenu-background-color: #f9f9f9
	}
</style>

<TopImage />

<nav>
	<Nav items={navTree} />
</nav>
