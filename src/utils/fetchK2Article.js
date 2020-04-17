const parser = new DOMParser()

/**
 * Requisita um artigo K2 e retorna seu conteúdo como uma string HTML
 * @param {string} url A url da página do artigo
 * @returns {Document} Uma string html do conteúdo do artigo
 */
export default async function fetchK2Article(url) {
	const res = await fetch(url)
	if (!res.ok) throw res
	const contentType = res.headers.get('content-type')
	if (!contentType.includes('text/html'))
		throw `expected content-type to include 'text/html', but found ${contentType}`
	const htmlText = await res.text()
	const htmlDom = parser.parseFromString(htmlText, 'text/html')
	const k2Article = htmlDom.getElementById('k2Container')
	return k2Article.innerHTML
}
