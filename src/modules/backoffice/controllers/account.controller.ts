import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Controller()
export class AccountController {
  constructor() {}

  @Get()
  @UseGuards(AuthGuard())
  async findAll() {}
}
