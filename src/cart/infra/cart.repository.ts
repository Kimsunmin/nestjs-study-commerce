import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/db/prisma.service';
import { cart, Prisma } from '@prisma/client';
import { CreateCartDto } from '../domain/dto/CreateCartDto';

@Injectable()
export class CartRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getCartById(id: number): Promise<cart> {
    const cartInfo: cart = await this.prisma.cart.findUnique({ where: { id } });
    return cartInfo;
  }

  async getCartByCustomerIds(
    customerId: number,
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<cart[]> {
    const cartInfo: cart[] = await tx.cart.findMany({
      where: { customer_id: customerId },
    });
    return cartInfo;
  }

  async createCart(createCartDto: CreateCartDto): Promise<cart> {
    const cartData = CreateCartDto.to(createCartDto);
    const cartInfo: cart = await this.prisma.cart.create({ data: cartData });

    return cartInfo;
  }

  async deleteCarts(
    customerId: number,
    tx: Prisma.TransactionClient = this.prisma,
  ): Promise<boolean> {
    await tx.cart.deleteMany({
      where: { customer_id: customerId },
    });
    return true;
  }
}
