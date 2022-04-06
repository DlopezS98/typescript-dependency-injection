import ProductResDto, {
  ProductRequestDto as ProductReqDto,
} from '@Shared/dtos/products.dto';

export default interface IProductsService {
  getAll(): Array<ProductResDto>;
  create(productDto: ProductReqDto): ProductResDto;
}
