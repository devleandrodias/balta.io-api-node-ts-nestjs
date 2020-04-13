import { Module } from '@nestjs/common'; // Core do NestJS
import { CustomerController } from './controller/customer.controller';

@Module({
  controllers: [CustomerController],
}) // @ = Decorator, agrega informações adicionais para a classe
export class BackofficeModule {}
