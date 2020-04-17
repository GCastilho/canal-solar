const domParser = new DOMParser()

/**
 * Busca por um HTML e retorna-o como objeto DOM
 * @param {string} url A URL do conteúdo XML
 * @returns {Promise<Document>} Um objeto DOM com o conteúdo do HTML
 */
export async function fetchHtml(url) {
	const res = await fetch(url)
	if (!res.ok) throw res
	const contentType = res.headers.get('content-type')
	if (!contentType.includes('text/html'))
		throw `expected content-type to include 'text/html', but found ${contentType}`
	const htmlText = await res.text()
	return domParser.parseFromString(htmlText, 'text/html')
}

/**
 * Faz uma requisição do conteúdo de uma página de artigos K2 e retorna
 * metadados sobre os artigos dela
 * @param {string} url A url da página de artigos
 */
export default async function fetchK2ArticlesPage(url) {
	if (!url) throw 'URL for articles page not provided'
	const articlesPage = await fetchHtml(url)
	const itemList = articlesPage.getElementById('itemListPrimary')
	const itemContainer = itemList.getElementsByClassName('itemContainer')

	const items = []
	for (const item of itemContainer) {
		const catItemImage = item.getElementsByClassName('catItemImage')[0].getElementsByTagName('img')[0]
		const catItemTitle = item.getElementsByClassName('catItemTitle')[0].getElementsByTagName('a')[0]
		const catItemAuthor = item.getElementsByClassName('catItemAuthor')[0].getElementsByTagName('a')[0]
		const catItemCategory = item.getElementsByClassName('catItemCategory')[0].getElementsByTagName('a')[0]
		const catItemDateCreated = item.getElementsByClassName('catItemDateCreated')[0]

		items.push({
			title: catItemTitle.innerText.trim(),
			// A url dos artigos deveria ser relativa à página atual
			link: catItemTitle.href.replace(/.+?index.php/, '').replace('/item', ''),
			author: {
				name: catItemAuthor.innerText,
				link: catItemAuthor.href.replace(/.+?index.php/, '')
			},
			category: {
				name: catItemCategory.innerText,
				link: catItemCategory.href.replace(/.+?index.php/, '')
			},
			thumbnail: {
				src: catItemImage.src.replace(/.+?index.php/, ''),
				alt: catItemImage.alt
			},
			pubDate: catItemDateCreated.innerText.trim()
		})
	}

	return items
}
