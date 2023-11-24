import { compare, hash } from 'bcryptjs'

export class PasswordHash {

	async hashPassword(password: string) {
		const saltRound = 6
		const passwordHashed = await hash(password, saltRound)

		return passwordHashed
	}

	async comparePassword(password: string, passwordDB: string) {
		const isHashed = await compare(password, passwordDB)

		return isHashed
	}
}