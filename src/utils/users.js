import axios from './axios'

/**
 * Mapa dos autores (usuários do k2)
 * @type {Map<number,any>}
 */
const users = new Map()

const initialFetch = axios.get('/api/users').then(res => {
	res.data.forEach(user => users.set(user.id, user))
}).catch(err => {
	throw `Error requesting authors data: ${err}`
})

/**
 * Retorna os usuários cadastrados no sistema
 * @param {number} id O ID da categoria sendo requisitada
 * @returns {object|undefined}
 */
export async function get(id) {
	if (typeof id != 'number')
		throw new TypeError('id must be a number')

	await initialFetch
	return users.get(id)
}
