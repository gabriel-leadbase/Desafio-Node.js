
import { UserRepository } from '@/repositories/prisma/user-repository'
import { CreateUserService } from '@/service/create-user-service'

export function makeCreateUser() {
	const userRepository = new UserRepository()
	const createUserService = new CreateUserService(userRepository)

	return createUserService
}