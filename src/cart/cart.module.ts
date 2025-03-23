import { Module } from '@nestjs/common';
import { CartService } from './domain/service/cart.service';
import { CartController } from './presentation/controller/cart.controller';
import { CartRepository } from './infra/cart.repository';
import { PrismaModule } from '../common/db/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CartController],
  providers: [CartService, CartRepository],
})
export class CartModule {}
