import { Prisma, User } from '@prisma/client'

export interface IUser {
    create(data: Prisma.UserUncheckedCreateInput): Promise<User>
    findByCpf(cpf: string): Promise<User | null>
}