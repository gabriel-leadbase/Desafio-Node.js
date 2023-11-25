import { makeCreateProduct } from '@/factory/make-create-product'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
    
	const getBodySchema = z.object({
		name: z.string(),
		valor: z.number(),
		description: z.string()
	})

	const { name, valor, description } = getBodySchema.parse(request.body)

	const createProductService = makeCreateProduct()

	try {
		const { product } = await createProductService.execute({
			description,
			name,
			valor
		})
        
		return reply.status(201).send({
			message: 'Produto criado',
			product
		})
	} catch (error) {
		return reply.status(401).send({
			message: 'Erro ao criar o produto'
		})
	}
}