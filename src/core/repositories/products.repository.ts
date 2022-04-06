import { injectable } from 'inversify';

import { PartialBy } from '@Src/shared/types/common.cd';
import IProducts, { Products } from '@Database/models/products.model';
import IProductsRepository from '@Interfaces/repositories/iproducts.repository';

@injectable()
export default class ProductsRepository implements IProductsRepository {
  private products: IProducts[];
  constructor() {
    this.products = [
      {
        id: '20SNQO20012L',
        name: 'T-Shirt',
        category: 'Clothes',
        description: 'Some description about the product',
        created_at: new Date('2022-04-06T14:59:12.600Z'),
        deleted: false,
      },
      {
        id: '21SNQO20012L',
        name: 'Jeans',
        category: 'Clothes',
        description: 'Some description about the product',
        created_at: new Date('2022-04-06T14:59:12.600Z'),
        deleted: false,
      },
    ];
  }
  getAll(): IProducts[] {
    return this.products;
  }
  create(partialProduct: PartialBy<IProducts, 'id'>): IProducts {
    const product = new Products().create(partialProduct).build();
    this.products.push(product);
    return product;
  }
}
