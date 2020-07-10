import axios from './_utils/axios'

export const users = new Map()

/** Atualiza o map de users */
async function fetchUsers() {
	try {
		let { data } = await axios.get('/api/users.php')

		// Da parse para number no id
		data = data.map(v => {
			v['id'] = +v['id']
			return v
		})

		for (let v of data) {
			users.set(v.id, v)
		}
	} catch (err) {
		console.error('Error fetching users:', err)
	}
}

async function fetchLoop() {
	await fetchUsers()
	setTimeout(fetchLoop, 3600000)
}

/** Requisição inicial de users */
const initialFetch = fetchLoop()

export async function get(req, res, next) {
	await initialFetch
	res.setHeader('Content-Type', 'application/json')

	try {
		if (req.query.refresh == 'true') await fetchUsers()
	} catch (err) {
		return res.status(500).end(JSON.stringify({
			error: 'Error requesting categories from content site'
		}))
	}

	const id = +req.query.id
	if (id) {
		res.end(JSON.stringify(users.get(id)))
	} else {
		res.end(JSON.stringify(Array.from(users.values())))
	}
}
