import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/db/prisma.service';
import { order } from '@prisma/client';

@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getOrderById(id: number): Promise<order> {
    const orderInfo: order = await this.prisma.order.findUnique({
      where: { id },
    });

    return orderInfo;
  }

  async createOrder(createOrderDto: any): Promise<order> {
    const orderData = createOrderDto;
    const orderInfo: order = await this.prisma.order.create({
      data: orderData,
    });
    return orderInfo;
  }
}
