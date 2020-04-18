import { JwtService } from '@nestjs/jwt';
import { AccountService } from 'src/modules/backoffice/services/account.service';
import { JwtPayload } from '../interfaces/jwtPayload.interface';

export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  async createToken() {
    const user: JwtPayload = { username: 'teste@gmail.com' };
    const accessToken = this.jwtService.sign(user);

    return {
      expiresIn: 3600,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.accountService.findOneByUsername(payload.username);
  }
}
