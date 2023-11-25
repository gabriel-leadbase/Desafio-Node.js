import { IPermission, PermissionProps } from '@/interface/IPermission'
import { Permissions, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryPermissionsRepository implements IPermission {
	
	private permissions: Permissions[] = []

	async create(data: Prisma.PermissionsUncheckedCreateInput) {
		const permission: Permissions = {
			id: data.id ?? randomUUID(),
			name: data.name,
			user_id: data.user_id ?? null,
			created_at: new Date(),
			updated_at: null
		} 

		this.permissions.push(permission)

		return permission
	}

	async findByName(name: string) {
		const permission = this.permissions.find(permiss => permiss.name === name)

		if(!permission) return null

		return permission
	}

	async findByUserIdAndId({id, user_id}: PermissionProps) {
		const permission = this.permissions.find(permiss => {
			return permiss.id == id && permiss.user_id == user_id
		})

		if(!permission) return null

		return [permission]
	}

    
}