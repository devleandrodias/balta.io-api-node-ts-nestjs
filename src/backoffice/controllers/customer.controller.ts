import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { GenericResult } from '../../shared/result.model';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateCustomerContract } from '../constracts/customer.contracts';
import { CreateCustomerDto } from '../dtos/createCustomerDto-dtos';

@Controller('v1/customers')
export class CustomerController {
  @Get()
  get() {
    return new GenericResult(null, true, [], null);
  }

  @Get(':document')
  getById(@Param('document') document: string) {
    return new GenericResult(null, true, {}, null);
  }

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
  post(@Body() body: CreateCustomerDto) {
    return new GenericResult(null, true, body, null);
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
