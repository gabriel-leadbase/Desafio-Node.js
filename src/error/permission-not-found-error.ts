export class PermissionNotFoundError extends Error {
	constructor() {
		super('Permissão não encontrada')
	}
}