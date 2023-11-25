import { authenticate } from '@/controller/user/authenticate'
import { refreshTokenAuthenticate } from '@/controller/user/refresh-token-authenticate'
import { register } from '@/controller/user/register'
import { FastifyInstance } from 'fastify'

export async function userRoute(app: FastifyInstance) {
	app.post('/', register)
	app.post('/login', authenticate)
	app.post('/refresh-token', refreshTokenAuthenticate)
}