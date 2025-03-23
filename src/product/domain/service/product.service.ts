import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../infra/product.repository';
import { CreateProductRequestDto } from '../../presentation/dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(createProductRequest: CreateProductRequestDto) {
    return await this.productRepository.createProduct(createProductRequest);
  }

  async findOne(productId: number) {
    return await this.productRepository.getProductById(productId);
  }
}
