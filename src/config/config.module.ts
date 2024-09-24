import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
import EnvironmentConstants from './EnvironmentConstants';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [EnvironmentConstants],
      isGlobal: true,
    }),
    DatabaseModule,
  ],
})
export class ConfigModule {}
