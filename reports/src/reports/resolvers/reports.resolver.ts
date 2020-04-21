import { Resolver, Args, Query } from '@nestjs/graphql';
import { Product } from '../models/product.model';
import { ReportService } from '../services/reports.service';
import { ProductArgs } from '../dtos/productsArgs.dto';

@Resolver(() => Product)
export class ReportsResolver {
  constructor(private readonly service: ReportService) {}

  @Query(() => Product)
  async product(@Args('id') id: string): Promise<Product> {
    return await this.service.findOneById(id);
  }

  @Query(() => Product)
  async products(@Args() args: ProductArgs): Promise<Product[]> {
    return await this.service.findAll(args);
  }
}
