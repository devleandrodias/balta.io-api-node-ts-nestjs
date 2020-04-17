import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../models/customer.model';
import { CreateAddressDto } from '../dtos/createAddress.dto';
import { PetDto } from '../dtos/createPet.dto';
import { QueryDto } from 'src/shared/query.dto';
import { CreditCard } from '../models/creditCard.model';
import { CreditCardDto } from '../dtos/CreditCardDto';

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

  async createPet(document: string, data: PetDto): Promise<PetDto> {
    // new: true, esse registro eh um novo registro, atribui um Id pra ele
    const options = { upsert: true, new: true };

    return await this.model.findOneAndUpdate(
      { document },
      {
        $push: {
          pets: data,
        },
      },
      options,
    );
  }

  async updatePet(document: string, id: string, data: PetDto): Promise<PetDto> {
    return await this.model.findOneAndUpdate(
      {
        document,
        'pets._id': id,
      },
      {
        $set: {
          'pets.$': data, // Significa que a gente vai atualizar o que foi encontrado em 'pets._id'
        },
      },
    );
  }

  async getAll(): Promise<Customer[]> {
    return await this.model
      .find({}, 'name email document')
      .sort('name')
      .exec(); // -name, trazer todos campos menos name
  }

  async getByDocument(document: string): Promise<Customer> {
    return await this.model
      .find({ document })
      .populate('user', 'username active')
      .exec();
  }

  async query(model: QueryDto): Promise<Customer[]> {
    return await this.model
      .find(model.query, model.fields, {
        skip: model.skip,
        limit: model.take,
      })
      .sort(model.sort)
      .exec();
  }

  async saveOrUpdateCreditCard(
    document: string,
    data: CreditCardDto,
  ): Promise<CreditCard> {
    const options = { upsert: true };

    return await this.model.findOneAndUpdate(
      { document },
      {
        $set: {
          card: data,
        },
      },
      options,
    );
  }
}
