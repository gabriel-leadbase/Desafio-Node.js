import { Prisma, User } from '@prisma/client'

export interface UserProps {
    id: string
    name: string
    cpf: string
    role: 'ADMIN' | 'VENDEDOR'
    password: string
    created_at: Date
    updated_at: Date | null
    permissionId: {
        name: string
    }[]
}

export interface IUser {
    create(data: Prisma.UserCreateInput): Promise<User>
    findByCpf(cpf: string): Promise<UserProps | null>
}