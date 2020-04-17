import { Contract } from '../../../../shared/contract';
import { Flunt } from 'src/utils/flunt';
import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from '../../dtos/createCustomer.dto';

@Injectable()
export class CreateCustomerContract implements Contract {
  errors: string[];

  validate(model: CreateCustomerDto): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(model.name, 5, 'Nome teve ter mais de 5 caracteres');
    flunt.isEmail(model.email, 'E-mail inválido');
    flunt.isFixedLen(model.document, 11, 'CPF Inválido');
    flunt.hasMinLen(model.password, 6, 'Senha deve ter mais de 6 caracteres');

    this.errors = flunt.errors;

    return flunt.isValid();
  }
}
