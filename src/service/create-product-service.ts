import { IProduct } from '@/interface/IProduct'
import { Product } from '@prisma/client'

interface CreateProductRequest {
    name: string
    description: string
    valor: number
}

interface CreateProductResponse {
    product: Product
}

export class CreateProductService {

	constructor(private productRepository: IProduct) {}

	async execute(data: CreateProductRequest): Promise<CreateProductResponse> {
		const product = await this.productRepository.create(data)

		return {
			product
		}
	}
}