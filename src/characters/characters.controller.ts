import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { Character } from '../character.entity';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  addCharacter(@Body('name') name: string, @Body('description') description: string): Promise<Character> {
    return this.charactersService.addCharacter(name, description);
  }

  @Get()
  getAllCharacters(): Promise<Character[]> {
    return this.charactersService.getAllCharacters();
  }

  @Get('/:id')
  getSingleCharacter(@Param('id') id: string): Promise<Character> {
    return this.charactersService.getSingleCharacter(id);
  }

  @Patch('/:id')
  updateCharacter(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('description') description: string
  ): Promise<Character> {
    return this.charactersService.updateCharacter(id, name, description);
  }

  @Delete('/:id')
  deleteCharacter(@Param('id') id: string): Promise<string> {
    return this.charactersService.deleteCharacter(id);
  }
}
