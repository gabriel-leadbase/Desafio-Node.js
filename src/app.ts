import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { userRoute } from './routes/user-route'
import { env } from './env/env'
import { permissionRoute } from './routes/permission-route'
import { ZodError } from 'zod'

export const app = fastify()

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	cookie: {
		cookieName: 'refresh-token',
		signed: false
	}
})

app.register(fastifyCookie)

app.register(userRoute, {
	prefix: '/user'
})

app.register(permissionRoute, {
	prefix: '/permission'
})

app.setErrorHandler((error, _, reply) => {
	if( error instanceof ZodError) return reply.status(404).send({
		message: 'Erro de validação',
		problemas: error.format()
	})

	reply.status(500).send({
		message: 'Erro interno do servidor'
	})
})