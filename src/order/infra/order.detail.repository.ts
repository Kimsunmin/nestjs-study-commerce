import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/db/prisma.service';
import { ordersDetail, Prisma } from '@prisma/client';
import { CreateOrderDetailDto } from '../domain/dto/create-order.detail.dto';

@Injectable()
export class OrderDetailRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getOrderDetailById(orderId: number): Promise<ordersDetail> {
    const orderDetailInfo: ordersDetail =
      await this.prisma.ordersDetail.findUnique({ where: { id: orderId } });

    return orderDetailInfo;
  }

  async createOrderDetail(
    createOrderDetailDto: CreateOrderDetailDto,
    tx: Prisma.TransactionClient,
  ): Promise<true> {
    const orderDetailData = CreateOrderDetailDto.to(createOrderDetailDto);
    await tx.ordersDetail.create({ data: orderDetailData });

    return true;
  }
}
