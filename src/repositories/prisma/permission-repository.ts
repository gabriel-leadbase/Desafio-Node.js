import { prisma } from '@/database/prisma'
import { IPermission, PermissionProps } from '@/interface/IPermission'
import { Prisma } from '@prisma/client'

export class PermissionRepository implements IPermission {

	async create(data: Prisma.PermissionsUncheckedCreateInput) {
		const permission = await prisma.permissions.create({
			data
		})

		return permission
	}
    
	async findByName(name: string) {
		const permission = await prisma.permissions.findUnique({
			where: {
				name
			}
		})

		if(!permission) return null

		return permission
	}

	async findByUserIdAndId(data: PermissionProps){
		const permission = await prisma.permissions.findMany({
			where: {
				AND: [
					{
						id: data.id
					},
					{
						user_id: data.userId
					}
				]
			}
		})

		if(!permission) return null

		return permission
	}
}