import { ProductRepository } from '@/repositories/prisma/product-repository'
import { CreateProductService } from '@/service/create-product-service'

export function makeCreateProduct() {
	const productRepository = new ProductRepository()
	const createProductService = new CreateProductService(productRepository)

	return createProductService
}