import { InMemoryPermissionsRepository } from '@/repositories/in-memory-repository/in-memory-permissions-repository'
import { CreatePermissionService } from './create-permission-service'

let permissionRepository: InMemoryPermissionsRepository
let sut: CreatePermissionService

describe('Create Permission Service', () =>{
	beforeEach(() => {
		permissionRepository = new InMemoryPermissionsRepository()
		sut = new CreatePermissionService(permissionRepository)
	})

	it('should be able to register a permission', async () => {
		const { permission } = await sut.execute({
			name: 'produto'
		})

		expect(permission).toEqual(expect.objectContaining({
			id: expect.any(String),
			name: 'produto'
		}))
	})
})