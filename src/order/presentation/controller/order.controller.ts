import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderService } from '../../domain/service/order.service';
import { CreateRequestOrderDto } from '../dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createRequestOrderDto: CreateRequestOrderDto) {
    return await this.orderService.create(createRequestOrderDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.orderService.findOne(+id);
  }
}
