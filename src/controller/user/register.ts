import { UserAlreadyExistsError } from '@/error/user-already-exists-error'
import { makeCreateUser } from '@/factory/make-create-user'
import { PasswordHash } from '@/utils/password-hash'
import { FastifyReply, FastifyRequest} from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {

	const getBodySchema = z.object({
		name: z.string(),
		cpf: z.string().min(11).max(11, 'O cpf não pode conter caracteres especiais'),
		password: z.string().min(8, 'A senha deve conter no mínimo 8 caracteres'),
		role: z.enum(['ADMIN', 'VENDEDOR']).default('VENDEDOR')
	})

	const { name, cpf, password, role } = getBodySchema.parse(request.body)

	const passwordHash = new PasswordHash()
	const hashed = await passwordHash.hashPassword(password)

	const createUserService = makeCreateUser()

	try {
		await createUserService.execute({
			cpf,
			name,
			password: hashed,
			role,
			permissionId: undefined
		})

		return reply.status(201).send({
			message: 'Usuário criado'
		})
	} catch (error) {
		if(error instanceof UserAlreadyExistsError) {
			return reply.status(401).send({
				message: error.message
			})
		}
	}
}