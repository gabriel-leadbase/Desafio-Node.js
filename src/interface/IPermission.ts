import { Permissions, Prisma } from '@prisma/client'

export interface PermissionProps {
    user_id: string | null,
    id: string
}

export interface IPermission {
    create(data: Prisma.PermissionsUncheckedCreateInput): Promise<Permissions>
    findByName(name: string): Promise<Permissions | null>
    findByUserIdAndId(data: PermissionProps): Promise<Permissions[] | null>
}