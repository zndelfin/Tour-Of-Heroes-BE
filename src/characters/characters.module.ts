import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { Character } from '../character.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Character])],
  controllers: [CharactersController],
  providers: [CharactersService]
})
export class CharactersModule {}
