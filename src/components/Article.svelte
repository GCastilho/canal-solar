<svelte:head>
	<link rel="stylesheet" href="css/articles.css">

	<!-- tem um meta que chama keywords que tem as tags -->
</svelte:head>

<script>
	export let title = ''
	export let date = ''
	export let content = ''
	export let author = { name: '', url: '' }
	export let category = { link: '', name: '' }
	export let thumbnail = { src: '' }

	date = new Date(date).toLocaleDateString('pt-BR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	})
</script>

<style>
	.itemCategory {
		margin-bottom: 15px;
	}

	.metaInfo {
		font-size: small;
	}

	.metaInfo a {
		color: black;
		font-weight: bold;
	}

	.metaInfo span {
		margin-left: 10px;
	}
</style>

<div id="k2Content">
	<div class="itemCategory">
		<a href={category.link}>{category.name}</a>
	</div>
	<h1>{title}</h1>
	<div class="metaInfo">
		<!-- TODO: href apontar p/ página do autor e lá ter a url dele -->
		Por: <a href={author.url}>{author.name}</a>
		<span>{date}</span>
	</div>
	<img src={thumbnail.src} alt={title}>
	{@html content}
</div>
