export class CreateCartRequestDto {
  customerId: number;
  productId: number;
  unitPrice: number;
  qty: number;
  createdAt: Date;
  updatedAt: Date | null;
}
