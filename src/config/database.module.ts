import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { FileLogger } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>('DATABASE.CONNECTION') as any,
        host: configService.get<string>('DATABASE.HOST'),
        port: configService.get<number>('DATABASE.PORT'),
        username: configService.get<string>('DATABASE.USERNAME'),
        password: configService.get<string>('DATABASE.PASSWORD'),
        database: configService.get<string>('DATABASE.DATABASE'),
        autoLoadEntities: true,
        synchronize: false,
        logging: false,
        logger: new FileLogger(true, { logPath: './logs/query.log' }),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
