<svelte:head>
	<link rel="stylesheet" href="css/articles.css">

	<!-- tem um meta que chama keywords que tem as tags -->
</svelte:head>

<script>
	import { onMount } from 'svelte'

	export let url = ''

	let fetchArticle
	onMount(async () => {
		const module = await import('../utils/fetchK2Article.js')
		fetchArticle = module.default
	})
</script>

<style>
	h2 {
		text-align: center;
	}
</style>

<!-- Esse if garante que o codigo não será executado em SSR -->
{#if fetchArticle}
	{#await fetchArticle(url)}
	<h2>Fetching article...</h2>
	{:then content}
		<div id="k2Content">
			{@html content}
		</div>
	{:catch err}
		<h2>Error fetching article:</h2>
		<p>{err}</p>
	{/await}
{/if}
