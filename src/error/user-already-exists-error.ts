export class UserAlreadyExistsError extends Error {
	constructor() {
		super('Usuário já cadastrado. ')
	}
}