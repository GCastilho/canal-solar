<script>
	import VideoCard from './VideoCard.svelte'
	import fetchFeed from '../../utils/fetchXmlFeed.js'
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

{#await fetchFeed('index.php/video?format=feed', 4)}
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
