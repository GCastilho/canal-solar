<script context="module">
	import { getTree } from '../utils/categories'
	import { get } from '../utils/posts'

	export async function preload({ host, params, path, query }) {
		if (path.includes('/item'))
			params.slug = params.slug.filter(v => v != 'item')

		function g(branch = [], slugIterator = [].entries(), parent = 0) {
			const [idx, slug] = slugIterator.next().value
			const node = branch.find(v => v.slug == slug)
			if (typeof node == 'undefined') {
				return {
					category: parent,
					slug
				}
			} else if (idx == params.slug.length - 1) {
				return { category: node.id }
			} else if (Array.isArray(node.childs)) {
				return g(node.childs, slugIterator, node.id)
			} else {
				return g(undefined, slugIterator, node.id)
			}
		}

		const { category, slug } = g(await getTree(), params.slug.entries())
		if (category && !slug) {
			return { list: await get(category) }
		} else if (category && slug) {
			return { article: await get(category, slug) }
		}
	}
</script>

<script>
	import ArticleList from '../components/ArticlesList.svelte'
	import Article from '../components/Article.svelte'
	import Error from './_error.svelte'

	export let list
	export let article
</script>

{#if list}
	<ArticleList {list} />
{:else if article}
	<Article {...article} />
{:else}
	<Error error={{message: 'A página que você está procurando não existe'}} status='Não encontrado' />
{/if}
