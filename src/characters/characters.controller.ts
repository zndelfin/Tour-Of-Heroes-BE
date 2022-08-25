import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
  } from '@nestjs/common';
  
  import { CharactersService } from './characters.service';
  
  @Controller('characters')
  export class CharactersController {
    constructor(private readonly charactersService: CharactersService) {}
  
    @Post()
    addCharacter(
      @Body('name') charName: string,
      @Body('description') charDesc: string
    ) {
      const generatedId = this.charactersService.insertCharacter(
        charName,
        charDesc
      );
      return { id: generatedId };
    }
  
    @Get()
    getAllCharacters() {
      return this.charactersService.getCharacters();
    }
  
    @Get(':id')
    getCharacters(@Param('id') charId: string) {
      return this.charactersService.getSingleCharacter(charId);
    }
  
    @Patch(':id')
    updateProduct(
      @Param('id') charId: string,
      @Body('name') charName: string,
      @Body('description') charDesc: string
    ) {
      this.charactersService.updateCharacter(charId, charName, charDesc);
      return null;
    }
  
    @Delete(':id')
    removeCharacter(@Param('id') charId: string) {
        this.charactersService.deleteCharacter(charId);
        return null;
    }
  }