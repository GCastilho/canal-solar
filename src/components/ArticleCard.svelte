<script>
	export let title = ''
	export let link = ''
	export let date = ''
	export let author = { name: '', url: '' }
	export let category = { link: '', name: '' }
	export let thumbnail = { src: '' }

	const { src } = thumbnail
</script>

<style>
	img {
		width: 100%;
	}

	a {
		color: #1c1c1c;
		text-decoration: none;
	}

	span {
		display: inline-block;
	}

	.articleCard {
		max-width: 500px;
		position: relative;
	}

	.itemCategory {
		position: absolute;
		left: 20px;
		top: 20px;
		padding: 5px;
		background-color: #1c1c1c;
		font-size: x-small;
	}

	.itemCategory::before {
		content: '';
		position: absolute;
		left: 0;
		bottom: -8px;
		border-right: 8px solid transparent;
		border-top: 8px solid #1c1c1c;
	}

	.itemCategory > a {
		color: white;
		text-transform: uppercase;
		font-weight: bold;
	}

	.itemHeader {
		padding: 2px 16px;
	}

	.metaInfo {
		font-size: smaller;
	}
</style>

<div class="articleCard">
	<a rel="prefetch" href={link}>
		<img {src} alt={title}>
		<div class="itemCategory">
			<a href={category.link}>{category.name}</a>
		</div>
		<div class="itemHeader">
			<h3>{title}</h3>
			<div class="metaInfo">
				<!-- TODO: href apontar p/ página do autor e lá ter a url dele -->
				<span><a href={author.url}><b>{author.name}</b></a></span>
				<span>{date}</span>
			</div>
		</div>
	</a>
</div>
