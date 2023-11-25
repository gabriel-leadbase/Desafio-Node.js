import { FastifyReply, FastifyRequest } from 'fastify'

export async function refreshTokenAuthenticate(request: FastifyRequest, reply: FastifyReply) {

	await request.jwtVerify({
		onlyCookie: true
	})

	const { sub, role, permissions } = request.user

	const token = await reply.jwtSign({
		role,
		permissions,
	}, {
		sign: {
			sub,
			expiresIn: '3d',
		}
	})

	const refreshToken = await reply.jwtSign({
		role,
		permissions,
	}, {
		sign: {
			sub,
			expiresIn: '3d',
		}
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
}