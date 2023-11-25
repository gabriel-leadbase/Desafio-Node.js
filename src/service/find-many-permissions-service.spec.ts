import { PermissionNotFoundError } from '@/error/permission-not-found-error'
import { InMemoryPermissionsRepository } from '@/repositories/in-memory-repository/in-memory-permissions-repository'
import { InMemoryUserRepository } from '@/repositories/in-memory-repository/in-memory-user-repository'
import { FindManyPermissionsService } from './find-many-permissions-service'

let permissionRepository: InMemoryPermissionsRepository
let userRepository: InMemoryUserRepository
let sut: FindManyPermissionsService

describe('Find Many Permissions Service', () => {
	beforeEach(() => {
		permissionRepository = new InMemoryPermissionsRepository()
		userRepository = new InMemoryUserRepository()
		sut = new FindManyPermissionsService(permissionRepository)
	})

	it('should be able to find a permission ',async () => {
		const user = await userRepository.create({
			cpf: '123456789987',
			name: 'lucas',
			password: '12345678',
		})

		const permiss = await permissionRepository.create({
			id: 'id-produto',
			name: 'produto',
			user_id: user.id
		})

		const { permission }  = await sut.execute({
			id: 'id-produto',
			user_id: permiss.user_id
		})


		expect(permission).toEqual([expect.objectContaining({
			name: 'produto'
		})])
	})

	it('should not be able to find a permission with invalid id',async () => {
		const user = await userRepository.create({
			cpf: '123456789987',
			name: 'lucas',
			password: '12345678',
		})

		const permiss = await permissionRepository.create({
			id: 'id-produto',
			name: 'produto',
			user_id: user.id
		})

		expect(async () => {
			await sut.execute({
				id: 'id-produto-errado',
				user_id: permiss.user_id
			})
		}).rejects.toBeInstanceOf(PermissionNotFoundError)

	})
})