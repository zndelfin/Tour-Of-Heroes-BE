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
        const character = this.findCharacter(characterId)[0];
        return { ...character };
      }
    
      updateCharacter(characterId: string, name: string, desc: string) {
        const [character, index] = this.findCharacter(characterId);
        const updatedCharacter = { ...character };
        if (name) {
          updatedCharacter.name = name;
        }
        if (desc) {
          updatedCharacter.description = desc;
        }
        this.characters[index] = updatedCharacter;
      }
    
      deleteCharacter(charId: string) {
          const index = this.findCharacter(charId)[1];
          this.characters.splice(index, 1);
      }
    
      private findCharacter(id: string): [CharactersModel, number] {
        const characterIndex = this.characters.findIndex(char => char.id === id);
        const character = this.characters[characterIndex];
        if (!character) {
          throw new NotFoundException("Character not found!");
        }
        return [character, characterIndex];
      }

}
