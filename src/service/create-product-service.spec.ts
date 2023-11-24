import { InMemoryProductRepository } from '@/repositories/in-memory-repository/in-memory-product-repository'
import { CreateProductService } from './create-product-service'

let productRepository: InMemoryProductRepository
let sut: CreateProductService

describe('Create Product Service', () => {
	beforeEach(() => {
		productRepository = new InMemoryProductRepository()
		sut = new CreateProductService(productRepository)
	})

	it('should be able to register a product', async () => {
		const { product } = await sut.execute({
			name: 'bolacha',
			description: 'deliciosa',
			valor: 5
		})

		expect(product).toEqual(expect.objectContaining({
			id: expect.any(String),
			name: 'bolacha',
			description: 'deliciosa',
		}))

	})
})