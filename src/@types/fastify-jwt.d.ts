import '@fastify/jwt'

declare module '@fastify/jwt' {
	interface FastifyJWT { // payload type is used for signing and verifying
		user: {
			sub: string,
            role: string,
			permissions_id: string
		} // user type is return type of `request.user` object
    }
}