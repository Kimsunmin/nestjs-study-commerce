import { Module } from '@nestjs/common';
import { OrderService } from './domain/service/order.service';
import { OrderController } from './presentation/controller/order.controller';
import { OrderRepository } from './infra/order.repository';
import { OrderDetailRepository } from './infra/order.detail.repository';
import { PrismaModule } from '../common/db/prisma.module';
import { CartRepository } from '../cart/infra/cart.repository';
import { ProductRepository } from '../product/infra/product.repository';

@Module({
  imports: [PrismaModule],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderRepository,
    OrderDetailRepository,
    CartRepository,
    ProductRepository,
  ],
})
export class OrderModule {}
