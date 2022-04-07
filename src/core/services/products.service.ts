import { inject, injectable } from 'inversify';

import ProductRespDto, {
  ProductRequestDto as ProductReqDto,
} from '@Src/shared/dtos/products.dto';
import IProductsService from '@Interfaces/services/iproducts.service';
import Interfaces from '@Interfaces/interfaces.mapping';
import IProductsRepository from '@Interfaces/repositories/iproducts.repository';
import IProducts from '@Database/models/products.model';

@injectable()
export default class ProductsService implements IProductsService {
  private readonly productsRepository: IProductsRepository;
  constructor(
    @inject(Interfaces.ProductsRepository)
    productsRepository: IProductsRepository
  ) {
    this.productsRepository = productsRepository;
  }

  getAll(): ProductRespDto[] {
    const products = this.productsRepository.getAll();
    return products.map((product) => this.mapProductRespDto(product));
  }

  create(productDto: ProductReqDto): ProductRespDto {
    const { name, category, description } = productDto;
    const product = this.productsRepository.create({
      name,
      category,
      description,
    });

    return this.mapProductRespDto(product);
  }

  private mapProductRespDto(product: IProducts): ProductRespDto {
    const {
      id,
      name,
      category,
      description,
      created_at: createdAt,
      updated_at: updatedAt,
    } = product;

    return { id, name, category, description, createdAt, updatedAt };
  }
}
