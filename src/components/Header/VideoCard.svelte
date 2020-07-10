<script>
	export let title
	export let link
	export let thumbnail

	const { src } = thumbnail
</script>

<style>
	img {
		width: 100%;
		height: 80%;
	}

	a {
		color: #1c1c1c;
		text-decoration: none;
	}

	figure {
		transition: 0.3s;
		width: 100%;
		margin: 0;
	}

	figcaption {
		padding: 4px 16px;
	}

	figcaption:hover {
		color: red;
	}
</style>

<a href={link}>
	<figure>
		<img {src} alt={title}>
		<figcaption>{title}</figcaption>
	</figure>
</a>
