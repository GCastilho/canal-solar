<script>
	import { onMount } from 'svelte'
	import ArticlesList from '../../components/ArticlesList.svelte'

	/** Esse array será usado em um replace no link dos artigos */
	const linkRegex = ['/video/', '/videos/']
</script>

<ArticlesList url='/index.php/video' {linkRegex}/>
