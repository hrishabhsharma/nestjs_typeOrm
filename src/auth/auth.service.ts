import { Injectable, UnauthorizedException } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { User } from 'src/auth/user/entities/user.entity';
import { UserService } from './user/user.service';
import { LogInDto, LoginType } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(logInDto: LogInDto) {
    const { username, password, loginType } = logInDto;

    const user = await this.findUserByLoginType(username, loginType);
    if (!user || this.hashPassword(password) !== user.password) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const token = await this.jwtService.signAsync(instanceToPlain(user));
    return { user, token };
  }

  private async findUserByLoginType(username: string, loginType: LoginType): Promise<User | null> {
    switch (loginType) {
      case LoginType.PHONE:
        return this.userService.findByMobileNo(username);
      case LoginType.EMAIL:
        return this.userService.findByEmail(username);
      default:
        return this.userService.findByUsername(username);
    }
  }

  private hashPassword(password: string): string {
    return crypto.createHash('md5').update(password).digest('hex');
  }
}
