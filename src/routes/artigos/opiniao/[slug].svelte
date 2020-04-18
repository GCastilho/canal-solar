<script context="module">
	/** Seta a variável url para a url do artigo do joomla */
	export async function preload(page) {
		const { slug } = page.params

		return {
			url: `/index.php/artigos/opiniao/item/${slug}`
		}
	}
</script>

<script>
	import Article from '../../../components/Article.svelte'

	export let url
</script>

<Article {url}/>
