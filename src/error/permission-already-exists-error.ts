export class PermissionAlreadyExistsError extends Error {
	constructor() {
		super('Permissão já cadastrado. ')
	}
}