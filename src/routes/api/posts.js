import axios from './_utils/axios'
import { categories as categoriesMap } from './categories'

export async function get(req, res, next) {
	const query = Object.keys(req.query)
		.reduce(function(a, k) {
			a.push(k + '=' + encodeURIComponent(req.query[k]))
			return a
		}, [])
		.join('&')

	res.setHeader('Content-Type', 'application/json')
	try {
		/** @type {{data:any[]}} */
		const { data } = await axios.get(`/api/posts.php?${query}`)
		for (let post of data) {
			const category = categoriesMap.get(+post.category)
			if (!category) continue
			post.link = category.link + '/' + post.slug
		}
		res.send(JSON.stringify(data))
	} catch (err) {
		res.status(500).send(JSON.stringify({ error: 'InternalServerError' }))
	}
}
