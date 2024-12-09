import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activer CORS pour autoriser le frontend sur http://localhost:3003
  app.enableCors({
    origin: 'http://localhost:3003', // Frontend URL
    methods: 'GET,POST,PATCH,DELETE', // Méthodes autorisées
    allowedHeaders: 'Content-Type, Authorization', // En-têtes autorisés
  });
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Enables transformation of request payloads to DTO instances
  }));

  await app.listen(3002);
}
bootstrap();
