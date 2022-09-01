import { Module } from '@nestjs/common';
import { CharactersModule } from './characters/characters.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [CharactersModule]
})
export class AppModule {}
