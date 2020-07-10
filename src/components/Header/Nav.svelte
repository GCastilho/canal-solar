<script>
	import Item from './Item.svelte'
	import VideoFeed from './VideoFeed.svelte'

	export let items
	export let depth = 0
</script>

<style>
	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
	}

	li:hover {
		background-color: red;
	}

	.row {
		display: flex;
		flex-direction: row;
		justify-content: center; /* Centering y-axis */
		flex-wrap: nowrap;
		position: relative;
	}

	.dropdown > ul {
		visibility: hidden;
		position: absolute;
		box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
		background-color: var(--dropmenu-background-color, #f9f9f9);
	}

	.dropdown > * {
		z-index: 999;
	}

	.dropdown:hover > ul {
		visibility: visible;
	}

	.video-list {
		left: 0;
		width: 100%;
		max-height: 290px;
		display: flex;
		flex-direction: row;
		justify-content: center;  /* Centering y-axis */
		align-items :center;      /* Centering x-axis */
	}

	.dropright {
		position: relative;
	}

	.dropright > ul {
		top: 0;
		left: 100%;
		display: none;
		position: absolute;
		box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
		background-color: var(--dropmenu-background-color, #f9f9f9);
	}

	.dropright:hover > ul {
		display: block;
	}
</style>

<ul class:row={!depth} >
	{#each items as item}
		<li class="{depth && depth > 1 ? 'dropright' : 'dropdown'}">
			<Item name={item.name} link={item.link} {depth} />
			{#if Array.isArray(item.childs)}
				<svelte:self items={item.childs} depth={++depth} />
			{:else if item.slug == 'videos'}
				<ul class="video-list">
					<VideoFeed />
				</ul>
			{/if}
		</li>
	{/each}
</ul>
