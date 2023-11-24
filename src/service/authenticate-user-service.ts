import { InvalidCredentialsError } from '@/error/invalid-credentials-error'
import { IUser } from '@/interface/IUser'
import { PasswordHash } from '@/utils/password-hash'
import { User } from '@prisma/client'

interface AuthenticateUserRequest {
    cpf: string,
    password: string
}

interface AuthenticateUserResponse {
    user: User
}

export class AuthenticateUserService {

	constructor(private userRepository: IUser) {}

	async execute(data: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
		const user = await this.userRepository.findByCpf(data.cpf)

		if(!user) throw new InvalidCredentialsError()

		const passwordHash = new PasswordHash()
		const isCorrectlyPassword = await passwordHash.comparePassword(data.password, user.password)

		if(!isCorrectlyPassword) throw new InvalidCredentialsError()

		return {
			user
		}
	}
}