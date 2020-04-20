import {
  Controller,
  Get,
  UseGuards,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from 'src/shared/services/authService';
import { JwtAuthGuard } from 'src/shared/guards/authGuard';
import { RoleInterceptor } from 'src/shared/interceptors/roles.interceptor';

@Controller('v1/accounts')
export class AccountController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async createToken(): Promise<any> {
    return await this.authService.createToken();
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new RoleInterceptor(['admin']))
  async findAll() {
    return 'Você tem permissão e token válido para essa requisição';
  }
}
