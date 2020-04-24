<script>
	import { onMount } from 'svelte'
	import ArticleCard from './ArticleCard.svelte'

	/** Array com match, replace para rodar na url dos artigos */
	export let linkRegex = []
	export let url = ''

	let fetchK2Articles = undefined
	onMount(async () => {
		const module = await import('../utils/fetchK2ArticlesFromPage.js')
		fetchK2Articles = async () => {
			const feed = await module.default(url)
			feed.forEach(item => {
				item.link = item.link.replace(...linkRegex)
			})
			return feed
		}
	})
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
		<p>{err.statusText}</p>
	{/await}
{/if}
