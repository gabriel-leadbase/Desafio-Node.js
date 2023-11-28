import { Permissions, Prisma } from '@prisma/client'

export interface IPermission {
    create(data: Prisma.PermissionsUncheckedCreateInput): Promise<Permissions>
    findByName(name: string): Promise<Permissions | null>
    findManyUserId(userId: string): Promise<Permissions[] | null>
    update(data:Prisma.PermissionsUncheckedUpdateWithoutUserInput, id: string): Promise<Permissions>
}