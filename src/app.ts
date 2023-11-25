import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { userRoute } from './routes/user-route'
import { env } from './env/env'

export const app = fastify()

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
})

app.register(userRoute, {
	prefix: '/user'
})
