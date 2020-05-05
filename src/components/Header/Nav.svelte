<script>
	import { onMount } from 'svelte';

	let VideoFeed;
	onMount(async () => {
		const videoList = await import('./VideoList.svelte');
		VideoFeed = videoList.default;
	})

	export let segment;
</script>

<style>
	nav {
		background-color: #333333;
		--dropmenu-background-color: #f9f9f9
	}

	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
	}

	li:hover {
		background-color: red;
	}

	a {
		text-decoration: none;
		color: black;
		display: block;
		padding: 16px;
	}

	.row {
		display: flex;
		flex-direction: row;
		justify-content: center; /* Centering y-axis */
		flex-wrap: nowrap;
		position: relative;
	}

	.row > li > a {
		color: white;
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

<nav>
	<ul class="row">
		<li><a href=".">Home</a></li>
		<li><a href="app">App</a></li>
		<li class="dropdown">
			<a href="artigos">Artigos</a>
			<ul>
				<li><a href="artigos/tecnicos">Técnicos</a></li>
				<li><a href="artigos/opiniao">Opinião</a></li>
			</ul>
		</li>
		<li><a href="cursos">Cursos</a></li>
		<li><a href="noticias">Notícias</a></li>
		<li class="dropdown">
			<a href="videos">Vídeos</a>
			<ul class="video-list">
				<svelte:component this={VideoFeed} />
			</ul>
		</li>
		<!--
			<li class="dropdown">
				<a href="javascript:void(0)">Seções especiais</a>
				<ul>
					<li><a href="/index.php/guia-de-empresas/fabricantes">Downloads</a></li>
					<li><a href="/index.php/secoes/reviews">Avaliações</a></li>
					<li><a href="/index.php/secoes/entrevistas">Entrevistas</a></li>
					<li><a href="/index.php/secoes/forum-canal-solar">Fórum</a></li>
					<li class="dropright">
						<a href="/index.php/secoes/eventos">Eventos</a>
						<ul>
							<li><a href="/index.php/secoes/eventos/workshops">Workshops</a></li>
						</ul>
					</li>
				</ul>
			</li>
			<li class="dropdown">
				<a href="/index.php/guia-de-empresas">Guia de empresas</a>
				<ul>
					<li><a href="/index.php/guia-de-empresas/distribuidores">Distribuidores</a></li>
					<li><a href="/index.php/guia-de-empresas/integradores">Integradores</a></li>
					<li><a href="/index.php/guia-de-empresas/fabricantes">Fabricantes</a></li>
				</ul>
			</li>
		-->
	</ul>
</nav>
