import { register } from '@/controller/permission/register'
import { FastifyInstance } from 'fastify'


export async function permissionRoute(app: FastifyInstance) {
	app.post('/', register)
}