import { UserRepository } from '@/repositories/prisma/user-repository'
import { AuthenticateUserService } from '@/service/authenticate-user-service'

export function makeAuthenticateUser() {
	const userRepository = new UserRepository()
	const authenticateUserService = new AuthenticateUserService(userRepository)

	return authenticateUserService
}