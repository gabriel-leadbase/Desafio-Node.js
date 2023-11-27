import { prisma } from '@/database/prisma'
import { IUser } from '@/interface/IUser'
import { Prisma } from '@prisma/client'

export class UserRepository implements IUser {
    
	async create(data: Prisma.UserCreateInput) {
		const user = await prisma.user.create({
			data
		})

		return user
	}
    
	async findByCpf(cpf: string) {
		const user = await prisma.user.findUnique({
			where: {
				cpf
			},
			include: {
				permissionId: {
					select: {
						name: true
					}
				}
			}
		})

		if(user === null) return null

		return user
	}
}