import { Injectable, NotFoundException } from '@nestjs/common';
import { CharactersModel } from './characters.model';
import { v4 as uuid } from "uuid";

@Injectable()
export class CharactersService {
    
    private characters: CharactersModel[] = [];

    addCharacter(name: string, desc: string) {
        const charId = uuid();
        const newCharacter = new CharactersModel(charId, name, desc);
        this.characters.push(newCharacter);
        return charId;
      }

    getCharacters() {
        return [...this.characters];
      }
    
      getSingleCharacter(characterId: string) {
        const character = this.characters.find(character => character.id === characterId)
        return { ...character };
      }
    
      updateCharacter(characterId: string, name: string, desc: string) {
        const character = this.characters.find(character => character.id === characterId)
        console.log(character)
        if (name) {
          character.name = name;
        }
        if (desc) {
          character.description = desc;
        }
        return character;
      }
    
      deleteCharacter(charId: string) {
          const characterIndex = this.characters.findIndex(char => char.id === charId);
          this.characters.splice(characterIndex, 1);
      }
}
