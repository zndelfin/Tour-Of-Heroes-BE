import { Module } from '@nestjs/common';
import { CharactersModule } from './characters/characters.module';

@Module({
  imports: [CharactersModule]
})
export class AppModule {}
