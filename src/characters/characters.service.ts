import { Injectable } from '@nestjs/common';
import { CharactersStatus } from './characters-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Characters } from '../characters.entity';
import { CharactersRepository } from './characters.repository';
import { CharactersModule } from './characters.module';

@Injectable()
export class CharactersService {
  // initialValues = [
  //   {
  //     id: '1',
  //     name: 'Aslaug',
  //     description: 'warrior queen'
  //   },

  //   {
  //     id: '2',
  //     name: 'Ivar the Boneless',
  //     description: 'commander of the Great Heathen Army'
  //   },

  //   {
  //     id: '3',
  //     name: 'Lagertha the Sheildmaiden',
  //     description: 'aka Hlaógerór'
  //   },

  //   {
  //     id: '4',
  //     name: 'Ragnar Lothbrok',
  //     description: 'aka Ragnard Sigurdsson'
  //   }
  // ];

  constructor(
    @InjectRepository(Characters)
    private charactersRepository: Repository<Characters>
  ) {}

  // private characters: CharactersModel[] = this.initialValues;
  // addCharacter(name: string, desc: string) {
  //   const charId = uuid();
  //   const newCharacter = new CharactersModel(charId, name, desc);
  //   this.characters.push(newCharacter);
  //   return charId;
  // }

  async getCharacters(): Promise<Characters[]> {
    return await this.charactersRepository.find();
  }

  async getSingleCharacter(id: string): Promise<Characters> {
    return await this.charactersRepository.findOneBy({ id });
  }

  // updateCharacter(characterId: string, name: string, desc: string) {
  //   const character = this.characters.find((character) => character.id === characterId);
  //   if (name) {
  //     character.name = name;
  //   }
  //   if (desc) {
  //     character.description = desc;
  //   }
  //   return character;
  // }

  // deleteCharacter(charId: string) {
  //   let filtered = this.characters;
  //   // return filtered.filter((character) => charId !== character.id);
  //   const deletedIndex = filtered.findIndex((character) => charId === character.id);
  //   return filtered.splice(deletedIndex, 1);
  // }
}
