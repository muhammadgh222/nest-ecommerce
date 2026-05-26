import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';
import { GlobalExceptionHandler } from './common/GlobalExceptionHandler';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
ConfigModule.forRoot();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new GlobalExceptionHandler());
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
