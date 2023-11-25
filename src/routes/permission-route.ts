import { register } from '@/controller/permission/register'
import { verifyToken } from '@/middleware/verify-token'
import { FastifyInstance } from 'fastify'


export async function permissionRoute(app: FastifyInstance) {
	app.addHook('onRequest', verifyToken('ADMIN'))

	app.post('/', register)
}