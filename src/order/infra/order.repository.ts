import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/db/prisma.service';
import { order, Prisma } from '@prisma/client';
import { CreateOrderDto } from '../domain/dto/create-order.dto';

@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getOrderById(id: number): Promise<order> {
    const orderInfo: order = await this.prisma.order.findUnique({
      where: { id },
    });

    return orderInfo;
  }

  async createOrder(
    createOrderDto: CreateOrderDto,
    tx: Prisma.TransactionClient,
  ): Promise<boolean> {
    const orderData = createOrderDto;
    await tx.order.create({
      data: orderData,
    });
    return true;
  }
}
