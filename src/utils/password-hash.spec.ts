import { PasswordHash } from './password-hash'

let passwordHash: PasswordHash

describe('Password Hash', () => {
	beforeEach(() => {
		passwordHash = new PasswordHash()
	})
    
	it('should be able to hash a password',async () => {
		const password = await passwordHash.hashPassword('12345678')

		expect(password).toBeTruthy()
	})

	it('should be able to a compare password',async () => {
		const password = await passwordHash.hashPassword('12345678')
		const isHashed = await passwordHash.comparePassword('12345678',password )

		expect(isHashed).toBeTruthy()
	})

	it('should not be able to a compare password',async () => {
		const password = await passwordHash.hashPassword('12345678')
		const isHashed = await passwordHash.comparePassword('wrong password',password )

		expect(isHashed).toBeFalsy()
	})
})