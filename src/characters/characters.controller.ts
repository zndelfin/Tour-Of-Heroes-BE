import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { Characters } from '../characters.entity';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  addCharacter(@Body('name') name: string, @Body('description') description: string): Promise<Characters> {
    return this.charactersService.addCharacter(name, description);
  }

  @Get()
  getAllCharacters(): Promise<Characters[]> {
    return this.charactersService.getAllCharacters();
  }

  @Get('/:id')
  getSingleCharacter(@Param('id') id: string): Promise<Characters> {
    return this.charactersService.getSingleCharacter(id);
  }

  @Patch('/:id')
  updateCharacter(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('description') description: string
  ): Promise<Characters> {
    return this.charactersService.updateCharacter(id, name, description);
  }

  @Delete('/:id')
  deleteCharacter(@Param('id') id: string): Promise<string> {
    return this.charactersService.deleteCharacter(id);
  }
}
