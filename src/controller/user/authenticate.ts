import { InvalidCredentialsError } from '@/error/invalid-credentials-error'
import { UserRepository } from '@/repositories/prisma/user-repository'
import { AuthenticateUserService } from '@/service/authenticate-user-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    
	const getBodySchema = z.object({
		cpf: z.string(),
		password: z.string()
	})

	const { cpf, password } = getBodySchema.parse(request.body)

	const userRepository = new UserRepository()
	const authenticateUserService = new AuthenticateUserService(userRepository)

	try {
		const { user } = await authenticateUserService.execute({
			cpf,
			password
		})

		const token = await reply.jwtSign({
			role: user.role
		}, {
			sub: user.id,
			expiresIn: '10m',
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