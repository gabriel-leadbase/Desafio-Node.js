import { IPermission } from '@/interface/IPermission'
import { Permissions } from '@prisma/client'

interface FindPermissionRequest {
    userId: string
}

interface FindPermissionResponse {
    permission: Permissions[]

}

export class FindPermissionService {

	constructor(private permissionRepository: IPermission) {}

	async execute(data: FindPermissionRequest): Promise<FindPermissionResponse> {
		const permission = await this.permissionRepository.findManyUserId(data.userId)
		console.log(permission)

		if(!permission || permission.length === 0) throw new Error('')

		return {
			permission
		}
	}
}