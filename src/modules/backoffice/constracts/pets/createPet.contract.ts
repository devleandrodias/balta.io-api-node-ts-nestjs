import { Injectable } from '@nestjs/common';
import { Contract } from 'src/shared/contract';
import { Flunt } from 'src/utils/flunt';
import { Pet } from 'src/backoffice/models/pet.model';

@Injectable()
export class CreatePetContract implements Contract {
  errors: string[];

  validate(model: Pet): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(model.name, 2, 'Nome deve ter mais de 2 caracteres');
    flunt.hasMinLen(model.gender, 3, 'Gênero deve ter mais de 2 caracteres');
    flunt.hasMinLen(model.kind, 3, 'Tipo deve ter mais de 2 caracteres');
    flunt.hasMinLen(model.brand, 3, 'Raça deve ter mais de 2 caracteres');

    this.errors = flunt.errors;

    return flunt.isValid();
  }
}
