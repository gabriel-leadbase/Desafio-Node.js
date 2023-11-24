import { UserAlreadyExistsError } from '@/error/user-already-exists-error'
import { InMemoryUserRepository } from '@/repositories/in-memory-repository/in-memory-user-repository'
import { CreateUserService } from './create-user-service'

let userRepository: InMemoryUserRepository
let sut: CreateUserService

describe('Create User Service', () => {
	beforeAll(() => {
		userRepository = new InMemoryUserRepository()
		sut = new CreateUserService(userRepository)
	})

	it('should be able to register a new user', async () => {
		const {user} = await sut.execute({
			cpf: '12345678912',
			name: 'john doe',
			password: '12345678',
			permissionId: undefined,
			
		})

		expect(user.role).toEqual('VENDEDOR')
	})

	it('should be able to register a new admin', async () => {
		const {user} = await sut.execute({
			cpf: '12345678913',
			name: 'john doe',
			password: '12345678',
			role: 'ADMIN',
			permissionId: undefined,
		})

		expect(user.role).toEqual('ADMIN')
	})

	it('should not be able to register a new user with same cpf', async () => {
		await sut.execute({
			cpf: '12345678901',
			name: 'john doe',
			password: '12345678',
			permissionId: undefined,
			
		})
		
		expect(async () => {
			await sut.execute({
				cpf: '12345678901',
				name: 'john doe',
				password: '12345678',
				permissionId: undefined,
				
			})
		}).rejects.toBeInstanceOf(UserAlreadyExistsError)
	})
})