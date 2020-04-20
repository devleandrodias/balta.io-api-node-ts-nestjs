import {
  Controller,
  Get,
  UseGuards,
  Post,
  Req,
  UseInterceptors,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from 'src/shared/services/authService';
import { JwtAuthGuard } from 'src/shared/guards/authGuard';
import { RoleInterceptor } from 'src/shared/interceptors/roles.interceptor';
import { AuthenticationDto } from '../dtos/authentication.dto';
import { AccountService } from '../services/account.service';
import { GenericResult } from 'src/shared/result.model';
import { GenericMessage } from 'src/shared/genericMessages.enum';

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
}
