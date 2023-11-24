import { IUser } from '@/interface/IUser'
import { Prisma, User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { randomUUID } from 'node:crypto'

export class InMemoryUserRepository implements IUser {

	private users: User[] = []
    
	async create(data: Prisma.UserCreateInput) {
		const user:User = {
			id: data.id ?? randomUUID(),
			cpf: data.cpf,
			name: data.name,
			password: await hash(data.password, 6),
			role: data.role ?? 'VENDEDOR',
			created_at: new Date(),
			updated_at: null
		} 

		this.users.push(user)

		return user
	}

	async findByCpf(cpf: string) {
		const user = this.users.find(use => use.cpf === cpf)

		if(user === undefined) return null

		return user
	}
}