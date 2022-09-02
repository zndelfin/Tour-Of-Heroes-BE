import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharactersController } from './characters.controller';
import { CharactersRepository } from './characters.repository';
import { CharactersService } from './characters.service';
import { Characters } from '../characters.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Characters])],
  controllers: [CharactersController],
  providers: [CharactersService, CharactersRepository]
})
export class CharactersModule {}
