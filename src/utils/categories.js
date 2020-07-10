import axios from './axios'

/**
 * Mapa das categorias
 * @type {Map<number,any>}
 */
const categories = new Map()

const initialFetch = axios.get('/api/categories').then(res => {
	res.data.forEach(category => categories.set(category.id, category))
}).catch(err => {
	throw `Error requesting categories: ${err}`
})

/**
 * Retorna um array de categorias (o mesmo retornado pela API)
 */
export async function get() {
	await initialFetch
	return Array.from(categories.values())
}

/**
 * Retorna o node de uma categoria através de uma de suas propriedades
 * @param {string} prop O nome da propriedade
 * @param {string|number} value O valor da propriedade
 */
export async function getCategoryByProp(prop, value) {
	const categories = await get()
	return categories.find(v => v[prop] == value)
}

/**
 * Faz um breadth first search em uma árvore procurando por um objeto com
 * o id informado
 * @param {object[]} tree O array/árvore de objetos que a busca sera feita
 * @param {string} prop O nome da propriedade que está sendo procurada
 * @param {number} propValue O valor da propriedade que sendo procurada
 */
function getNodeByProp(tree = [], prop, propValue) {
	const queue = []
	tree.forEach(item => queue.push(item))
	for (let item of queue) {
		if (item[prop] == propValue) return item
		if (Array.isArray(item.childs)) queue.push(...item.childs)
	}
}

/** Lista de categorias organizadas no formato de uma árvore */
const categoriesTree = get().then(categories => {
	/** Deep copy do array de categorias pois ele será modificado nessa função */
	return JSON.parse(JSON.stringify(categories))
}).then(categories => {
	const tree = [{ name: 'Home', link: '/' }]
	for (let node of categories) {
		if (node.parent) {
			const parent = getNodeByProp(tree, 'id', node.parent)
			if (!parent) { // Coloca no final da lista para ser processado depois
				categories.push(node)
				continue
			}
			if (!Array.isArray(parent.childs)) parent.childs = []
			parent.childs.push(node)
		} else {
			tree.push(node)
		}
	}

	return tree
})

/**
 * Retorna uma árvore da lista de categorias e subcategorias cadastradas
 */
export async function getTree() {
	return categoriesTree
}
