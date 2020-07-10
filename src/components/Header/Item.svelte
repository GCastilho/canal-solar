<script>
	export let name
	export let link
	export let depth = 0
</script>

<style>
	a {
		text-decoration: none;
		color: black;
		display: block;
		padding: 16px;
	}

	.main-row {
		color: white;
	}
</style>

<a rel="prefetch" class:main-row={!depth} href={link}>{name}</a>
