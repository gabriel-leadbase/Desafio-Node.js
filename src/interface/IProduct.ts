import { Prisma, Product } from '@prisma/client'

export interface IProduct {
    create(data: Prisma.ProductCreateInput): Promise<Product>
}