import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy } from 'passport-http';

@Injectable()
export class BasicAuthStrategy extends PassportStrategy(BasicStrategy, 'basic') {
  constructor(private configService: ConfigService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const MasterUsername = this.configService.get<string>('AUTH.USERNAME');
    const MasterPassword = this.configService.get<string>('AUTH.PASSWORD');
    if (username != MasterUsername || password != MasterPassword) {
      throw new UnauthorizedException(`Unauthorized request with ${username} and ${password}`);
    }
    return true;
  }
}
