import IProducts, { BaseProperties } from '@Database/models/products.model';

export default interface IProductsRepository {
  getAll(): Array<IProducts>;
  create(product: BaseProperties): IProducts;
}