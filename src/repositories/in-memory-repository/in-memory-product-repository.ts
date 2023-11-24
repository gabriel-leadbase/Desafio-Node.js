import { IProduct } from '@/interface/IProduct'
import { Prisma, Product } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { randomUUID } from 'node:crypto'

export class InMemoryProductRepository implements IProduct {

	private products: Product[] = []
    
	async create(data: Prisma.ProductCreateInput){
		const product: Product = {
			id: data.id ?? randomUUID(),
			name: data.name,
			description: data.description,
			valor: new Decimal(data.valor.toString()),
			created_at: new Date(),
			updated_at: null
		}

		this.products.push(product)

		return product
	}
    
}