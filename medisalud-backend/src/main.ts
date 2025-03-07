import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,  // ❌ Ignora propiedades desconocidas
      transform: true,  // 🔄 Convierte valores automáticamente
      forbidNonWhitelisted: true, // 🔍 Previene datos no definidos en DTO
    }),
  );
  app.enableCors(); // Habilita CORS si la API se consume desde un frontend externo
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
