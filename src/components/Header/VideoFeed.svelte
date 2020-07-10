<script>
	import VideoCard from './VideoCard.svelte'
	import { get } from '../../utils/posts'

	const feed = get(10).then(p => p.slice(0, 4))
</script>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
	}

	.item {
		max-width: 280px;
		padding: 5px;
	}
</style>

{#await feed}
	<p>Fetching video feed</p>
{:then videoFeed}
	<div class="grid">
		{#each videoFeed as {title, link, thumbnail}}
			<div class="item">
				<VideoCard {title} {link} {thumbnail} />
			</div>
		{/each}
	</div>
{:catch err}
	<p>There was an error fetching the feed {err}</p>
{/await}
