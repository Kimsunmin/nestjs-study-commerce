export class CreateCartDto {
  customerId: number;
  productId: number;
  unitPrice: number;
  qty: number;
  createdAt: Date;
  updatedAt: Date;

  static to(dto: CreateCartDto) {
    return {
      customer_id: dto.customerId,
      product_id: dto.productId,
      unit_price: dto.unitPrice,
      qty: dto.qty,
      created_at: new Date(dto.createdAt),
      updated_at: new Date(dto.updatedAt),
    };
  }
}
