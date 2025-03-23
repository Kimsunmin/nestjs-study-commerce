import { Controller } from '@nestjs/common';
import { CartService } from './domain/service/cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
}
