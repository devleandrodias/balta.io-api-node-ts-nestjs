import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CustomLogger } from './shared/services/logger';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger(),
  });

  app.use(compression());

  const options = new DocumentBuilder()
    .setTitle('Petshop API')
    .setDescription('API do curso de Node com Typescript')
    .setVersion('1.0.0')
    .addTag('petshop')
    .build();

  const documentation = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('', app, documentation);

  await app.listen(4000);
}
bootstrap();
