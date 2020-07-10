import axios from './_utils/axios'

export const categories = new Map()

/** Atualiza o map de categorias */
async function fetchCategories() {
	try {
		let { data } = await axios.get('/api/categories.php')

		// Da parse para number no id e no parent
		data = data.map(v => {
			v['id'] = +v['id']
			v['parent'] = +v['parent']
			return v
		})

		for (let v of data) {
			categories.set(v.id, v)
		}
	} catch (err) {
		console.error('Error fetching categories:', err)
	}
}

async function fetchLoop() {
	await fetchCategories()
	setTimeout(fetchLoop, 3600000)
}

/** Requisição inicial das categorias */
const initialfetch = fetchLoop()

export async function get(req, res, next) {
	await initialfetch
	res.setHeader('Content-Type', 'application/json')

	try {
		if (req.query.refresh == 'true') await fetchCategories()
	} catch (err) {
		return res.status(500).end(JSON.stringify({
			error: 'Error requesting categories from content site'
		}))
	}

	res.end(JSON.stringify(Array.from(categories.values())))
}
