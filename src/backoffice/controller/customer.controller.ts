import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Customer } from '../model/customer.model';
import { Result } from '../model/result.model';

@Controller('v1/customers')
export class CustomerController {
  @Get()
  get() {
    return new Result(null, true, [], null);
  }

  @Get(':document')
  getById(@Param('document') document: string) {
    return new Result(null, true, {}, null);
  }

  @Post()
  post(@Body() body: Customer) {
    return new Result(null, true, body, null);
  }

  @Put(':document')
  put(@Param('document') document: string, @Body() body: Customer) {
    return new Result('Cliente atualizado com sucesso!', true, {}, null);
  }

  @Delete(':document')
  delete(@Param('document') document: string) {
    return new Result(`Cliente removido com sucesso!`, true, null, null);
  }
}
