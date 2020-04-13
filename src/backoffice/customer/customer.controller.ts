import { Controller } from '@nestjs/common';

@Controller('customer')
export class CustomerController {
  get() {
    return 'Obter Clientes';
  }

  post() {
    return 'Criar um cliente';
  }

  put() {
    return 'Atualizar um cliente';
  }

  delete() {
    return 'Remover um cliente';
  }
}
