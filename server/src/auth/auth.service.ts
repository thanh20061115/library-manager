import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // Tài khoản mặc định
  private admin = {
    id: 1,
    username: 'admin',
    // mật khẩu: 123456
    password:
      '$2b$10$/w/3jb/yNbJTv4LBP.wW2.cpdF1HMmDInG7Vx965lQNoKyZRKCPsG',
  };

  async login(username: string, password: string) {
    if (username !== this.admin.username) {
      throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
    }

    const isMatch = await bcrypt.compare(password, this.admin.password);

    if (!isMatch) {
      throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
    }

    const payload = {
      sub: this.admin.id,
      username: this.admin.username,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}