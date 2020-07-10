<script>
	import ArticleCard from './ArticleCard.svelte'

	export let list
</script>

<style>
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

<div class="grid">
	{#each list as {title, author, link, date, category, thumbnail} (thumbnail.src)}
		<div class="item">
			<ArticleCard {title} {author} {link} {date} {category} {thumbnail} />
		</div>
	{/each}
</div>
