import { Injectable } from '@nestjs/common';
import { CharactersModel } from './characters.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CharactersService {
  initialValues = [
    {
      id: '1',
      name: 'Aslaug',
      description: 'warrior queen'
    },

    {
      id: '2',
      name: 'Ivar the Boneless',
      description: 'commander of the Great Heathen Army'
    },

    {
      id: '3',
      name: 'Lagertha the Sheildmaiden',
      description: 'aka Hlaógerór'
    },

    {
      id: '4',
      name: 'Ragnar Lothbrok',
      description: 'aka Ragnard Sigurdsson'
    }
  ];

  private characters: CharactersModel[] = this.initialValues;

  addCharacter(name: string, desc: string) {
    const charId = uuid();
    const newCharacter = new CharactersModel(charId, name, desc);
    this.characters.push(newCharacter);
    return charId;
  }

  getAllCharacters() {
    return [...this.characters];
  }

  getSingleCharacter(characterId: string) {
    return this.characters.find((character) => character.id === characterId);
  }

  updateCharacter(characterId: string, name: string, desc: string) {
    const character = this.characters.find((character) => character.id === characterId);
    if (name) {
      character.name = name;
    }
    if (desc) {
      character.description = desc;
    }
    return character;
  }

  deleteCharacter(charId: string) {
    const list = this.characters;
    const filtered = list.filter((character) => charId !== character.id);
    return filtered;
  }
}
