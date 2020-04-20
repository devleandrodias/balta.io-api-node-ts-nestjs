import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Guid } from 'guid-typescript';
import { AuthService } from 'src/shared/services/authService';
import { AuthenticationDto } from '../dtos/authentication.dto';
import { AccountService } from '../services/account.service';
import { GenericResult } from 'src/shared/result.model';
import { ResetPasswordDto } from '../dtos/resetPassword.dto';

@Controller('v1/accounts')
export class AccountController {
  constructor(
    private readonly authService: AuthService,
    private readonly accountService: AccountService,
  ) {}

  @Post('authentication')
  async authentication(@Body() model: AuthenticationDto): Promise<any> {
    const customer = this.accountService.authenticate(
      model.username,
      model.password,
    );

    if (!customer)
      throw new HttpException(
        new GenericResult('Usuário e/ou senha inválidos', false, null, null),
        HttpStatus.NOT_FOUND,
      );

    if ((await customer).user.active) {
      throw new HttpException(
        new GenericResult('Usuário inativo', false, null, null),
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = await this.authService.createToken(
      (await customer).document,
      (await customer).email,
      '',
      (await customer).user.roles,
    );

    return new GenericResult(null, true, token, null);
  }

  @Post('reset-password')
  async resetPassword(@Body() model: ResetPasswordDto): Promise<any> {
    try {
      // TODO: Enviar email com nova senha

      const password = Guid.create()
        .toString()
        .substring(0, 8)
        .replace('-', '');

      await this.accountService.update(model.document, { password });

      return new GenericResult(
        'Uma nova senha foi enviada para seu email',
        true,
        null,
        null,
      );
    } catch (error) {
      throw new HttpException(
        new GenericResult(
          'Não foi possível no momento restaurar sua senha',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
