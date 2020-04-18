import { Controller, Get, UseGuards, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/shared/services/authService';

@Controller('v1/accounts')
export class AccountController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async createToken(): Promise<any> {
    return await this.authService.createToken();
  }

  @Get()
  @UseGuards(AuthGuard())
  async findAll() {
    return [];
  }
}
