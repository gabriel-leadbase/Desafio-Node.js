import { PermissionAlreadyExistsError } from '@/error/permission-already-exists-error'
import { IPermission } from '@/interface/IPermission'
import { Permissions } from '@prisma/client'

interface CreatePermissionRequest {
    name: string
}

interface CreatePermissionResponse {
    permission: Permissions
}

export class CreatePermissionService {

	constructor(private permissionRepository: IPermission) {}

	async execute(data: CreatePermissionRequest): Promise<CreatePermissionResponse> {
		const permissionExists = await this.permissionRepository.findByName(data.name)

		if(permissionExists != null) throw new PermissionAlreadyExistsError()

		const permission = await this.permissionRepository.create(data)

		return {
			permission
		}
	}
}