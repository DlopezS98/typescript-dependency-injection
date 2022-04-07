import { inject } from 'inversify';
import { Response } from 'express';
import {
  controller,
  httpGet,
  httpPost,
  requestBody,
  response,
} from 'inversify-express-utils';

import Interfaces from '@Interfaces/interfaces.mapping';
import StatusCodes from '@Shared/types/http-status-codes';
import ProductsService from '@Services/products.service';
import ProductResponseDto, {
  ProductRequestDto,
} from '@Shared/dtos/products.dto';
import { SuccessResponse } from '@Shared/models/http.response';
import Middlewares from '@Middlewares/middlewares.mapping';
import BaseController from './base.controller';

@controller('/products', Middlewares.JwtAuth)
export default class ProductsController extends BaseController {
  constructor(
    @inject(Interfaces.ProductsService)
    private productsService: ProductsService
  ) {
    super();
  }

  @httpGet('/')
  getAll(
    @response() resp: Response<Array<ProductResponseDto>>
  ): Response<Array<ProductResponseDto>> {
    const products = this.productsService.getAll();
    return resp.status(StatusCodes.Ok).json(products);
  }

  @httpPost('/')
  create(
    @requestBody() product: ProductRequestDto,
    @response() resp: Response<SuccessResponse<ProductResponseDto>>
  ): Response<SuccessResponse<ProductResponseDto>> {
    const productDto = this.productsService.create(product);
    const successResponse = new SuccessResponse<ProductResponseDto>({
      data: productDto,
      message: 'Product created successfully!',
      statusCode: StatusCodes.Created,
    });

    return resp.status(StatusCodes.Created).json(successResponse);
  }
}
