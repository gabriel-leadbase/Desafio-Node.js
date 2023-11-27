import { FastifyReply, FastifyRequest } from 'fastify'


export function verifyToken(roleToVerify: 'ADMIN' |  'VENDEDOR', permissionToVerify: string) {
	return async (request: FastifyRequest, reply: FastifyReply) => {
	
		await request.jwtVerify({
			onlyCookie: true
		})
		
		const { role, permissions } = request.user
		console.log(permissions)
		
		const productPermission = permissions.filter(permiss => {
			return permiss.name === 'produto'
		})
	
		if(role !== roleToVerify && productPermission[0].name !== permissionToVerify) return reply.status(401).send({
			message: 'Não autorizado'
		})

	
		await request.jwtVerify()
		
	}
	
}