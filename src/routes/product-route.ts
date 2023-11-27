import { register } from '@/controller/product/register'
import { verifyToken } from '@/middleware/verify-token'
import { FastifyInstance } from 'fastify'


export async function productRoute(app: FastifyInstance) {
	app.addHook('onRequest', verifyToken('ADMIN', 'produto'))

	app.post('/', register)
}