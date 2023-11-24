import { register } from '@/controller/user/register'
import { FastifyInstance } from 'fastify'

export async function userRoute(app: FastifyInstance) {
	app.post('/', register)
}