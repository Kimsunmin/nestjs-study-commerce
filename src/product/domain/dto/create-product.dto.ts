export class CreateProductDto {
  productname: string;
  price: number;
  qty: number;

  static to(dto: CreateProductDto) {
    return {
      productname: dto.productname,
      price: dto.price,
      qty: dto.qty,
    };
  }
}
