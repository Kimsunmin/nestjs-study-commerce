import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from '../../domain/service/product.service';
import { CreateProductRequestDto } from '../dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(
    @Body() createProductRequestDto: CreateProductRequestDto,
  ) {
    return await this.productService.create(createProductRequestDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productService.findOne(+id);
  }
}
