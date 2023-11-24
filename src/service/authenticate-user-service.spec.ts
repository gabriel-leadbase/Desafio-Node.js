import { InvalidCredentialsError } from '@/error/invalid-credentials-error'
import { InMemoryUserRepository } from '@/repositories/in-memory-repository/in-memory-user-repository'
import { AuthenticateUserService } from '@/service/authenticate-user-service'

let userRepository: InMemoryUserRepository
let sut: AuthenticateUserService

describe('Authenticate User Service', () => {
	beforeEach(() => {
		userRepository = new InMemoryUserRepository()
		sut = new AuthenticateUserService(userRepository)
	})

	it('should be able to authenticate an user', async () => {
		await userRepository.create({
			cpf: '12345678912',
			name: 'lucas',
			password: '12345678'
		})

		const { user } = await sut.execute({
			cpf: '12345678912',
			password: '12345678'
		})

		expect(user).toEqual(expect.objectContaining({
			id: expect.any(String),
			name: 'lucas'
		}))
	})

	it('should not be able to authenticate an user with wrong password', async () => {
		await userRepository.create({
			cpf: '12345678912',
			name: 'lucas',
			password: '12345678'
		})

		expect(async () => {
			await sut.execute({
				cpf: '12345678912',
				password: 'wrong password'
			})
		}).rejects.toBeInstanceOf(InvalidCredentialsError)
	})
})