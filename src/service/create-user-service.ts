import { UserAlreadyExistsError } from '@/error/user-already-exists-error'
import { IUser } from '@/interface/IUser'
import { Prisma, User } from '@prisma/client'

interface CreateUserRequest {
    name: string,
    cpf: string,
    role?: 'ADMIN' | 'VENDEDOR',
    password: string,
    permissionId: Prisma.PermissionsUncheckedCreateNestedManyWithoutUserInput | undefined
}

interface CreateUserResponse {
    user: User
}

export class CreateUserService {

	constructor(private userRepository: IUser) {}

	async execute(data: CreateUserRequest): Promise<CreateUserResponse> {
		const userExists = await this.userRepository.findByCpf(data.cpf)

		if(userExists != null) throw new UserAlreadyExistsError()

		const user = await this.userRepository.create(data)

		return {
			user
		}
	}
}