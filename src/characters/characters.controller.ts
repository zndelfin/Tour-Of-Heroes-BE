import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { CharactersService } from './characters.service';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  // @Post()
  // addCharacter(@Body('name') charName: string, @Body('description') charDesc: string) {
  //   const generatedId = this.charactersService.addCharacter(charName, charDesc);
  //   return { id: generatedId };
  // }

  // @Get()
  // getAllCharacters() {
  //   return this.charactersService.getCharacters();
  // }

  // @Get(':id')
  // getSingleCharacter(@Param('id') charId: string) {
  //   return this.charactersService.getSingleCharacter(charId);
  // }

  // @Patch(':id')
  // updateCharacter(@Param('id') charId: string, @Body('name') charName: string, @Body('description') charDesc: string) {
  //   return this.charactersService.updateCharacter(charId, charName, charDesc);
  // }

  // @Delete(':id')
  // deleteCharacter(@Param('id') charId: string) {
  //   return this.charactersService.deleteCharacter(charId);
  // }
}
