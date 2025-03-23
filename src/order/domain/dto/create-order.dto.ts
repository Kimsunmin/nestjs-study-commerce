export class CreateOrderDto {
  customerId: number;
  orderNo: string;
  totalPrice: number;
  status: string;
  createdAt: Date;
  updatedAt: Date | null;

  static to(dto: CreateOrderDto) {
    return {
      customer_id: dto.customerId,
      order_no: dto.orderNo,
      total_price: dto.totalPrice,
      status: dto.status,
      created_at: new Date(dto.createdAt),
      updated_at: new Date(dto.updatedAt),
    };
  }
}

export class CreateResultOrderDto {
  id: number;
  isSuccess: boolean;

  constructor(init: { id: number; isSuccess: boolean }) {
    this.id = init.id;
    this.isSuccess = init.isSuccess;
  }
}
