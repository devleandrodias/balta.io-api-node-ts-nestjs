import { Injectable } from '@nestjs/common';
import { Product } from '../models/product.model';
import { ProductArgs } from '../dtos/productsArgs.dto';

@Injectable()
export class ReportService {
  async findOneById(id: string): Promise<Product> {
    return {
      id: '1234',
      title: 'MacBook Air 2017',
      description: 'MacBook Air 2017, Prata, Modelo 1GF45S',
    };
  }

  async findAll(args: ProductArgs): Promise<Product[]> {
    return [
      {
        id: '1234',
        title: 'MacBook Air 2017',
        description: 'MacBook Air 2017, Prata, Modelo 1GF45S',
      },
      {
        id: '2345',
        title: 'MacBook Pro 2020',
        description: 'MacBook Pro 2020, Rosê, Modelo 4GS455',
      },
      {
        id: '3634',
        title: 'iPhone 11 Pro Max 2020',
        description: 'iPhone 11 Pro Max 2020, Red, Modelo 14GSR32',
      },
      {
        id: '6342',
        title: 'MacBook 2018',
        description: 'MacBook 2018, Azul, Modelo 234GSSE',
      },
    ] as Product[];
  }
}
