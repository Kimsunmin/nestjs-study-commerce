import { Injectable } from '@nestjs/common';
import { CreateRequestOrderDto } from '../../presentation/dto/create-order.dto';
import { CreateOrderDto, CreateResultOrderDto } from '../dto/create-order.dto';
import { OrderRepository } from '../../infra/order.repository';
import { CartRepository } from '../../../cart/infra/cart.repository';
import { PrismaService } from '../../../common/db/prisma.service';
import { ProductRepository } from '../../../product/infra/product.repository';
import { CreateOrderDetailDto } from '../dto/create-order.detail.dto';
import { OrderDetailRepository } from '../../infra/order.detail.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,

    private readonly cartRepository: CartRepository,
    private readonly orderRepository: OrderRepository,
    private readonly orderDetailRepository: OrderDetailRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async create(
    createRequestOrderDto: CreateRequestOrderDto,
  ): Promise<CreateResultOrderDto> {
    const { customerId } = createRequestOrderDto;

    const cartInfo = await this.cartRepository.getCartByCustomerIds(customerId);

    if (!cartInfo || cartInfo.length === 0) {
      throw new Error('장바구니 정보가 없습니다.');
    }

    const result: boolean = await this.prisma.$transaction(async (tx) => {
      this.cartRepository.deleteCarts(customerId, tx);

      const productIds = cartInfo.map((item) => item.product_id);

      const products = await this.productRepository.getProductByIdsWithLock(
        productIds,
        tx,
      );

      let totalPrice = 0;
      const orderDetails: CreateOrderDetailDto[] = [];
      for (const cart of cartInfo) {
        const product = products.find(
          (product) => product.id === cart.product_id,
        );

        if (!product) {
          throw new Error(`상품 ID ${product.id}를 찾을 수 없습니다.`);
        }

        if (product.qty < cart.qty) {
          throw new Error(`상품 ${product.id}의 재고가 부족합니다.`);
        }

        totalPrice += cart.unit_price * cart.qty;

        orderDetails.push({
          order_no: '',
          product_id: product.id,
          unit_price: cart.unit_price,
          qty: cart.qty,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }

      const orderNo = `Order-${Date.now()}`;
      const createOrderDto = new CreateOrderDto();

      createOrderDto.customerId = customerId;
      createOrderDto.orderNo = orderNo;
      createOrderDto.totalPrice = totalPrice;
      createOrderDto.status = '주문완료';
      createOrderDto.createdAt = new Date();
      createOrderDto.updatedAt = new Date();

      await this.orderRepository.createOrder(createOrderDto, tx);

      for (const detail of orderDetails) {
        const detailWithOrderNo = { ...detail, order_no: orderNo };
        await this.orderDetailRepository.createOrderDetail(
          detailWithOrderNo,
          tx,
        );
      }

      return true;
    });

    return new CreateResultOrderDto({
      id: customerId,
      isSuccess: result,
    });
  }

  async findOne(id: number) {
    return await this.orderRepository.getOrderById(id);
  }
}
