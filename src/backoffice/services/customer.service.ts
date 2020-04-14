import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../models/customer.model';
import { CreateAddressDto } from '../dtos/createAddress.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private readonly model: Model<Customer>,
  ) {}

  async create(data: Customer): Promise<Customer> {
    const customer = new this.model(data);
    return await customer.save();
  }

  async addBillingAddress(
    document: string,
    data: CreateAddressDto,
  ): Promise<Customer> {
    // Se ele buscar e não existir ele cria, se existir ele atualiza
    const options = { upsert: true };
    return await this.model.findOneAndUpdate(
      { document },
      {
        $set: {
          billingAddress: data,
        },
      },
      options,
    );
  }

  async addShippingAddress(
    document: string,
    data: CreateAddressDto,
  ): Promise<Customer> {
    const options = { upsert: true };
    return await this.model.findOneAndUpdate(
      { document },
      {
        $set: {
          shippingAddress: data,
        },
      },
      options,
    );
  }
}
