import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly respository: Repository<Order>,
  ) {}

  async getByNumber(number: string): Promise<Order> {
    return await this.respository.findOne({ number });
  }

  async getByCustomer(customer: string): Promise<Order> {
    return await this.respository.findOne({ customer });
  }

  async post(data: Order) {
    await this.respository.save(data);
  }
}
