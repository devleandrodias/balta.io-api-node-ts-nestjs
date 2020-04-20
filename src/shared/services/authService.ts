import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/modules/backoffice/services/account.service';
import { JwtPayload } from '../interfaces/jwtPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  async createToken() {
    const user: JwtPayload = {
      document: '12345678911',
      email: 'teste@teste.com',
      image:
        'https://microhealth.com/assets/images/illustrations/personal-user-illustration-@2x.png',
      roles: ['admin'],
    };

    const accessToken = this.jwtService.sign(user);

    return {
      expiresIn: 3600,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return payload;
    // return await this.accountService.findOneByUsername(payload.document);
  }
}
