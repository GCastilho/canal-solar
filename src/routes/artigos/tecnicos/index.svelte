<script>
	import { onMount } from 'svelte'
	import ArticlesList from '../../../components/ArticlesList.svelte'

	/** Esse array será usado em um replace no link dos artigos */
	const linkRegex = ['artigos-tecnicos', 'tecnicos']
</script>

<ArticlesList url='/index.php/artigos/artigos-tecnicos' {linkRegex} />
