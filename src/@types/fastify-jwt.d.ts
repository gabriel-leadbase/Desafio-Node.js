import '@fastify/jwt'

declare module '@fastify/jwt' {
	interface FastifyJWT { 
		user: {
			sub: string,
            role: string,
			permissions: {
				name: string
			}[]
		} // user type is return type of `request.user` object
    }
}