<script>
	//import fetchK2Articles from '../utils/fetchK2ArticlesFromPage.js'
	import { onMount } from 'svelte'
	import ArticleCard from './ArticleCard.svelte'

	let fetchK2Articles = undefined
	onMount(async () => {
		const module = await import('../utils/fetchK2ArticlesFromPage.js')
		fetchK2Articles = module.default
	})

	export let url = ''
</script>

<style>
	h2 {
		text-align: center;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		max-width: 1000px;
		margin-left: auto;
		margin-right: auto;
	}

	.item {
		max-width: 300px;
		padding: 5px;
	}
</style>

<!-- Esse if garante que o codigo não será executado em SSR -->
{#if fetchK2Articles}
	{#await fetchK2Articles(url)}
		<h2>Fetching feed</h2>
	{:then feed}
		<div class="grid">
			{#each feed as {title, author, link, pubDate, category, thumbnail}}
				<div class="item">
					<ArticleCard {title} {author} {link} {pubDate} {category} {thumbnail} />
				</div>
			{/each}
		</div>
	{:catch err}
		<h2>Error fetching feed</h2>
		<p>{err}</p>
	{/await}
{/if}
