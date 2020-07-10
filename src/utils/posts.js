import axios from './axios'
import { getCategoryByProp } from './categories'
import { get as getUser } from './users'

/**
 * Retorna um post ou lista de posts de uma categoria
 * @param {number} category O ID da categoria sendo requisitada
 * @param {string} [slug] O slug do post que será sendo procurado
 * @returns {object|object[]}
 */
export async function get(category, slug) {
	if (typeof category != 'number')
		throw new TypeError('category must be a number')

	let url = `/api/posts?categories=${category}`
	if (typeof slug == 'string')
		url = url + `&slug=${slug}`

	const { data } = await axios.get(url)

	if (Array.isArray(data)) {
		for (let post of data) {
			post.category = await getCategoryByProp('id', post.category)
			post.author = await getUser(+post.author)
		}
	}

	return typeof slug == 'string' && Array.isArray(data) ? data[0] : data
}
