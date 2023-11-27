import { prisma } from '@/database/prisma'
import { IPermission } from '@/interface/IPermission'
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

	async findManyUserId(userId: string) {
		const permission = await prisma.permissions.findMany({
			where: {
				user_id: userId
			}
		})

		if(!permission) return null

		return permission
	}
}