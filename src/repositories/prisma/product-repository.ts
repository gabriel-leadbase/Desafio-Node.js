import { prisma } from '@/database/prisma'
import { IProduct } from '@/interface/IProduct'
import { Prisma } from '@prisma/client'

export class ProductRepository implements IProduct {

	async create(data: Prisma.ProductCreateInput){
		const product = await prisma.product.create({
			data
		})

		return product
	}
}