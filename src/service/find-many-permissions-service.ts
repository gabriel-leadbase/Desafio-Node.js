import { PermissionNotFoundError } from '@/error/permission-not-found-error'
import { IPermission } from '@/interface/IPermission'
import { Permissions } from '@prisma/client'

interface FindManyPermissionsRequest {
    user_id: string | null
    id: string
}   

interface FindManyPermissionsResponse {
    permission: Permissions[]
}

export class FindManyPermissionsService {

	constructor(private permissionsRepository: IPermission) {}

	async execute(data: FindManyPermissionsRequest): Promise<FindManyPermissionsResponse> {
		const permission = await this.permissionsRepository.findByUserIdAndId(data)

		if(permission?.length === 0 || !permission) throw new PermissionNotFoundError()

		return {
			permission
		}
	}
}