<svelte:head>
	<title>Canal Solar</title>
</svelte:head>

<script context="module">
	import { getTree } from '../utils/categories'

	export async function preload() {
		return {
			navTree: await getTree()
		}
	}
</script>

<script>
	import Header from '../components/Header/index.svelte'

	export let segment
	export let navTree
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<Header {navTree} {segment} />

<main>
	<slot></slot>
</main>
