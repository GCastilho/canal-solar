<svelte:head>
	<title>Canal Solar</title>
</svelte:head>

<script>
	import Nav from '../components/Nav.svelte';
	import Header from '../components/Header/index.svelte';

	export let segment;
</script>

<style>
	main {
		position: relative;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<Header {segment}/>
<!--<Nav {segment}/>-->

<main>
	<slot></slot>
</main>
