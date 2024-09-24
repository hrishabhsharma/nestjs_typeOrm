import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { RoutesModule } from './modules/routes.module';
import { APP_GUARD } from '@nestjs/core';
import { BasicAuthGuard } from './auth/basic/basic.guard';

@Module({
  imports: [ConfigModule, AuthModule, RoutesModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: BasicAuthGuard,
    },
  ],
})
export class AppModule {}
