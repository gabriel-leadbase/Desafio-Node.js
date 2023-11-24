export class InvalidCredentialsError extends Error {
	constructor() {
		super('Credencias inválidas')
	}
}