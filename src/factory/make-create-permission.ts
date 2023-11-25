import { PermissionRepository } from '@/repositories/prisma/permission-repository'
import { CreatePermissionService } from '@/service/create-permission-service'

export function makeCreatePermission() {
	const permissionRepository = new PermissionRepository()
	const createPermissionService = new CreatePermissionService(permissionRepository)

	return createPermissionService
}