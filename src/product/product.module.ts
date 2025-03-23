import { Module } from '@nestjs/common';
import { ProductService } from './domain/service/product.service';
import { ProductController } from './presentation/controller/product.controller';
import { ProductRepository } from './infra/product.repository';
import { PrismaModule } from '../common/db/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
