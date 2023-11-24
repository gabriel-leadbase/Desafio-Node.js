import { prisma } from '@/database/prisma'
import { IUser } from '@/interface/IUser'
import { Prisma } from '@prisma/client'

export class UserRepository implements IUser {
    
	async create(data: Prisma.UserCreateInput) {
		const users = await prisma.user.create({
			data
		})

		return users
	}
    
	async findByCpf(cpf: string) {
		const users = await prisma.user.findUnique({
			where: {
				cpf
			}
		})

		if(users === null) return null

		return users
	}
    
}