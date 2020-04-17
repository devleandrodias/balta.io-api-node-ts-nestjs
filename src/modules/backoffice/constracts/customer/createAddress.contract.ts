import { Contract } from '../../../shared/contract';
import { Flunt } from 'src/utils/flunt';
import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from 'src/backoffice/dtos/createAddress.dto';

@Injectable()
export class CreatAddressContract implements Contract {
  errors: string[];

  validate(model: CreateAddressDto): boolean {
    const flunt = new Flunt();

    flunt.isFixedLen(model.zipCode, 8, 'CEP Inválido');
    flunt.hasMinLen(model.street, 3, 'Rua Inválida');
    flunt.hasMinLen(model.neighbohood, 3, 'Bairro Inválido');
    flunt.hasMinLen(model.city, 2, 'Cidade Inválida');
    flunt.isFixedLen(model.state, 2, 'Estado Inválido');
    flunt.isFixedLen(model.country, 3, 'País Inválido');

    this.errors = flunt.errors;

    return flunt.isValid();
  }
}
