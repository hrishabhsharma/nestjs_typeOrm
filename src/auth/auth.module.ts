import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { BasicAuthStrategy } from './basic/basic.strategy';
import { JwtAuthStrategy } from './jwt/jwt.strategy';
import { UsersModule } from './user/users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get<string>('JWT.SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, BasicAuthStrategy, JwtAuthStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
