import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { userRoute } from './routes/user-route'
import { env } from './env/env'
import { permissionRoute } from './routes/permission-route'

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
