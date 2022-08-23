import { NestFactory } from '@nestjs/core';
import { CharactersModule } from './characters/characters.module';
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(CharactersModule);

  app.useGlobalPipes(
    new ValidationPipe()
  );

  await app.listen(3000);
}
bootstrap();
