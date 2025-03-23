import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/db/prisma.service';
import { Prisma, product } from '@prisma/client';
import { CreateProductDto } from '../domain/dto/create-product.dto';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(createProductDto: CreateProductDto): Promise<product> {
    const productData = CreateProductDto.to(createProductDto);
    const productInfo = await this.prisma.product.create({ data: productData });

    return productInfo;
  }

  async getProductById(productId: number): Promise<product> {
    const productInfo: product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    return productInfo;
  }

  async getProductByIds(
    productIds: number[],
    tx: Prisma.TransactionClient,
  ): Promise<product[]> {
    const productInfo = await tx.product.findMany({
      where: { id: { in: productIds } },
    });

    return productInfo;
  }

  async getProductByIdsWithLock(
    productIds: number[],
    tx: Prisma.TransactionClient,
  ): Promise<product[]> {
    const productInfo = await tx.$queryRaw<product[]>`
    SELECT *
    FROM product
    WHERE id IN (${Prisma.join(productIds)})
    FOR UPDATE;
    `;

    return productInfo;
  }

  async updateProductByIds(
    productId: number,
    qty: number,
    tx: Prisma.TransactionClient,
  ): Promise<void> {
    await tx.product.update({
      where: { id: productId },
      data: {
        qty: {
          decrement: qty,
        },
      },
    });
  }
}
