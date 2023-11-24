import { IPermission } from '@/interface/IPermission'
import { Permissions, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryPermissionsRepository implements IPermission {

	private permissions: Permissions[] = []

	async create(data: Prisma.PermissionsCreateInput) {
		const permission: Permissions = {
			id: data.id ?? randomUUID(),
			name: data.name,
			user_id: null,
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
    
}