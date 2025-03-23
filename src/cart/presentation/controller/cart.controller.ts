import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CartService } from '../../domain/service/cart.service';
import { CreateCartRequestDto } from '../dto/create-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async createCart(@Body() createCartRequestDto: CreateCartRequestDto) {
    return await this.cartService.createCart(createCartRequestDto);
  }

  @Get(':id')
  async findOne(@Param('id') cartId: string) {
    return await this.cartService.findOne(+cartId);
  }
}
