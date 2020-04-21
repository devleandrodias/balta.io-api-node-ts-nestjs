import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  async get(): Promise<Product[]> {
    return await this.repository.find();
  }

  async getById(id: number): Promise<Product> {
    return this.repository.findOne(id);
  }

  async post(data: Product) {
    await this.repository.save(data);
  }

  async put(id: number, data: Product) {
    await this.repository.update(id, data);
  }

  async delete(id: number) {
    await this.repository.delete(id);
  }
}
