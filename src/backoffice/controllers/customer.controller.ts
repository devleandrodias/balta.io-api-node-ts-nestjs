import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GenericResult } from '../../shared/result.model';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateCustomerContract } from '../constracts/customer/createCustomer.contract';
import { CreateCustomerDto } from '../dtos/createCustomer.dto';
import { AccountService } from '../services/account.service';
import { User } from '../models/user.model';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer.model';
import { CreateAddressDto } from '../dtos/createAddress.dto';
import { CreatAddressContract } from '../constracts/customer/createAddress.contract';
import { CreatePetContract } from '../constracts/pets/createPet.contract';
import { PetDto } from '../dtos/createPet.dto';

@Controller('v1/customers')
export class CustomerController {
  constructor(
    private readonly accountService: AccountService,
    private readonly customerService: CustomerService,
  ) {}

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
  async post(@Body() model: CreateCustomerDto) {
    try {
      const user = await this.accountService.create(
        new User(model.document, model.password, true),
      );

      const res = await this.customerService.create(
        new Customer(
          model.name,
          model.document,
          model.email,
          [],
          null,
          null,
          null,
          user,
        ),
      );

      return new GenericResult('Cliente criado com sucesso!', true, res, null);
    } catch (error) {
      //Roolback, bancos noSQL, não possui transação
      throw new HttpException(
        new GenericResult(
          'Não foi possível realizar seu cadastro',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(':document/address/billing')
  @UseInterceptors(new ValidatorInterceptor(new CreatAddressContract()))
  async addBillingAddress(
    @Param('document') document: string,
    @Body() model: CreateAddressDto,
  ) {
    try {
      await this.customerService.addBillingAddress(document, model);
      return new GenericResult(
        'Endereço adicionado com sucesso!',
        true,
        model,
        null,
      );
    } catch (error) {
      throw new HttpException(
        new GenericResult(
          'Não foi possível adicionar seu endereço de cobrança',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(':document/address/shipping')
  @UseInterceptors(new ValidatorInterceptor(new CreatAddressContract()))
  async addShippingAddress(
    @Param('document') document: string,
    @Body() model: CreateAddressDto,
  ) {
    try {
      await this.customerService.addShippingAddress(document, model);
      return new GenericResult(
        'Endereço adicionado com sucesso!',
        true,
        model,
        null,
      );
    } catch (error) {
      throw new HttpException(
        new GenericResult(
          'Não foi possível adicionar seu endereço de entrega',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(':document/pets')
  @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
  async createPet(@Param('document') document: string, @Body() model: PetDto) {
    try {
      await this.customerService.createPet(document, model);
      return new GenericResult(
        'Novo pet cadastrado com sucesso',
        true,
        model,
        null,
      );
    } catch (error) {
      throw new HttpException(
        new GenericResult(
          'Não foi possível adicionar seu pet',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':document')
  put(@Param('document') document: string, @Body() body: CreateCustomerDto) {
    return new GenericResult('Cliente atualizado com sucesso!', true, {}, null);
  }

  @Delete(':document')
  delete(@Param('document') document: string) {
    return new GenericResult(`Cliente removido com sucesso!`, true, null, null);
  }
}
