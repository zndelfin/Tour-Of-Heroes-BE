import { Controller, Get, Post, Body, Param, NotFoundException, Delete, Query, Patch } from '@nestjs/common';
import { CreateCharacterDTO } from './dto/create-character.dto';
import { CharactersService } from './characters.service';


@Controller('characters')
export class CharactersController {
    constructor(public charactersService: CharactersService) { }

    @Get()
    findAll() {
        return this.charactersService.findAll();
    }

    @Post()
    createCharacter(@Body() createCharacterDTO: CreateCharacterDTO) {
        return this.charactersService.createCharacter(createCharacterDTO);
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.charactersService.findOne(id);
    }

    // @Patch(":id")
    // update(@Param("id") id: string, @Body() updateUserDTO: UpdateUserDTO) {
    //     return this.charactersService.update(id, updateUserDTO);
    // }

    // @Delete()
    // remove(@Param("id") id: string) {
    //     return this.charactersService.remove(id);
    // }
}
