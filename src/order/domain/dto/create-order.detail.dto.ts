export class CreateOrderDetailDto {
  order_no: string;
  product_id: number;
  unit_price: number;
  qty: number;
  created_at: Date;
  updated_at: Date | null;

  static to(dto: CreateOrderDetailDto) {
    return {
      order_no: dto.order_no,
      product_id: dto.product_id,
      unit_price: dto.unit_price,
      qty: dto.qty,
      created_at: dto.created_at,
      updated_at: dto.updated_at,
    };
  }
}
