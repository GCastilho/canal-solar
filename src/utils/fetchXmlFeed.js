import x2js from 'x2js'

const xmlParser = new x2js()
const domParser = new DOMParser()

/**
 * Busca por um XML e retorna-o como objeto
 * @param {string} url A URL do conteúdo XML
 * @returns {object} Um objeto com o conteúdo do xml
 */
export async function fetchXml(url) {
	const res = await fetch(url)
	if (!res.ok) throw res
	const contentType = res.headers.get('content-type')
	if (!contentType.includes('application/rss+xml'))
		throw `expected content-type to include 'application/rss+xml', but found ${contentType}`
	const xmlText = await res.text()
	return xmlParser.xml2js(xmlText)
}

/**
 * Faz a requisição de um feed xml e retorna informações relevantes
 * sobre o conteúdo
 * @param {string} url A url do feed
 * @param {number} limit Limitar o retorno aos n itens mais recentes
 */
export default async function fetchFeed(url, limit = 0) {
	const { rss } = await fetchXml(url)

	const feed = rss.channel.item.map(item => {
		const desct = domParser.parseFromString(item.description, 'text/html')
		const div = desct.getElementsByTagName('div')[0]
		const img = div.getElementsByTagName('img')[0]
		return {
			title: item.title,
			author: {
				name: item.author.match(/\(([^()]+)\)/g)[0].replace(/\(|\)/g, ''),
				email: item.author.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)[0]
			},
			link: item.link,
			category: item.category,
			pubDate: item.pubDate,
			thumbnail: {
				src: img.src,
				alt: img.alt
			}
		}
	})

	return limit ? feed.slice(0, limit) : feed
}
