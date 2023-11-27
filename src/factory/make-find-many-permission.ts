import { PermissionRepository } from '@/repositories/prisma/permission-repository'
import { FindManyPermissionsService } from '@/service/find-many-permissions-service'

export function makeFindManyPermission() {
	const permissionRepository = new PermissionRepository()
	const findManyPermissionService = new FindManyPermissionsService(permissionRepository)

	return findManyPermissionService
}