import fastify from 'fastify'
import { userRoute } from './routes/user-route'

export const app = fastify()

app.register(userRoute, {
	prefix: '/user'
})