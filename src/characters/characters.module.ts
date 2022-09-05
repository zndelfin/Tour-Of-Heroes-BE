import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { Characters } from '../characters.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Characters])],
  controllers: [CharactersController],
  providers: [CharactersService]
})
export class CharactersModule {}
