import { Injectable } from '@nestjs/common';
import { CartRepository } from '../../infra/cart.repository';
import { CreateCartRequestDto } from '../../presentation/dto/create-cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  async createCart(createCartRequestDto: CreateCartRequestDto) {
    return await this.cartRepository.createCart(createCartRequestDto);
  }

  async findOne(id: number) {
    return await this.cartRepository.getCartById(id);
  }
}
