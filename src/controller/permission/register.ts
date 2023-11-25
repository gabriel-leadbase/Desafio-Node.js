import { PermissionAlreadyExistsError } from '@/error/permission-already-exists-error'
import { makeCreatePermission } from '@/factory/make-create-permission'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
    
	const getBodySchema = z.object({
		name: z.string()
	})

	const { name } = getBodySchema.parse(request.body)

	const createPermissionService = makeCreatePermission()

	try {
		await createPermissionService.execute({
			name
		})

		return reply.status(201).send({
			message: 'Permissão criada'
		})
	} catch (error) {
		if(error instanceof PermissionAlreadyExistsError) {
			return reply.status(400).send({
				message: error.message
			})
		}
	}
}