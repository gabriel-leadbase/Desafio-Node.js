import { InvalidCredentialsError } from '@/error/invalid-credentials-error'
import { makeAuthenticateUser } from '@/factory/make-authenticate-user'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    
	const getBodySchema = z.object({
		cpf: z.string(),
		password: z.string()
	})

	const { cpf, password } = getBodySchema.parse(request.body)

	const authenticateUserService = makeAuthenticateUser()

	try {
		const { user } = await authenticateUserService.execute({
			cpf,
			password
		})

		const token = await reply.jwtSign({
			role: user.role,
			permissions: user.permissions_id
		}, {
			sub: user.id,
			expiresIn: '10m',
		})

		const refreshToken = await reply.jwtSign({
			role: user.role,
			permissions: user.permissions_id
		}, {
			sub: user.id,
			expiresIn: '3d',
		})

		reply.setCookie('refresh-token', refreshToken, {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: true
		})

		return reply.status(200).send({
			token
		})
	} catch (error) {
		if(error instanceof InvalidCredentialsError) {
			return reply.status(400).send({
				message: error.message
			})
		}
	}
}