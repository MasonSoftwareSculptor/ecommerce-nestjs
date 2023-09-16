import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as compression from 'compression';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(compression());
  app.use(helmet());

  const configService = app.get(ConfigService);

  await app.listen(configService.get<string>('port'));
}
bootstrap();
