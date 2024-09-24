import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './common/logger';
import { ExceptionHandlerFilter } from './common/exception-handler/exception-handler.filter';
import { ResponseHandlerInterceptor } from './common/response-handler/response-handler.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });
  const configService = app.get(ConfigService);

  app.enableCors();
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new ExceptionHandlerFilter());
  app.useGlobalInterceptors(new ResponseHandlerInterceptor());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('hrishabh-api-swagger')
    .setVersion('1.0')
    .addBasicAuth(
      {
        type: 'http',
        scheme: 'basic',
      },
      'basic',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      authAction: {
        basic: {
          name: 'basic',
          schema: {
            type: 'http',
            in: 'header',
            scheme: 'basic',
          },
        },
      },
    },
  });

  await app.listen(configService.get<number>('PORT'));

  Logger.log(
    `Application is running on: http://localhost:${configService.get<number>('PORT')}/api`,
    'ServerLoader',
  );

  const dataSource = app.get<DataSource>(getDataSourceToken());

  if (dataSource.isInitialized) {
    Logger.log('Database connection established successfully.', 'DBLoader');
  } else {
    Logger.error('Database connection failed.', 'DBLoader');
  }
}
bootstrap();
