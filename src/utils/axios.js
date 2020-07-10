import { default as originalAxios } from 'axios'

/**
 * Export uma instancia do axios com as configurações para fazer requests
 * com urls relativas corretamente no servidor e no cliente
 */
export default originalAxios.create({
	baseURL: typeof window == 'undefined' ? 'http://localhost:3000' : ''
})
