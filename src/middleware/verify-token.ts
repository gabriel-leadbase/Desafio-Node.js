import { FastifyReply, FastifyRequest } from 'fastify'


export function verifyToken(roleToVerify: 'ADMIN' |  'VENDEDOR') {
	return async (request: FastifyRequest, reply: FastifyReply) => {
	
		await request.jwtVerify({
			onlyCookie: true
		})
		
		const { role } = request.user
	
		if(role !== roleToVerify) return reply.status(401).send({
			message: 'Não autorizado'
		})
	
		await request.jwtVerify()
	}
	
}