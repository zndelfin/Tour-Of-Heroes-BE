import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from './character.entity';
import { CharactersModel } from './characters.model';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character)
    private charactersRepository: Repository<Character>
  ) {}

  async addCharacter(name: string, description: string): Promise<Character> {
    const newCharacter = new CharactersModel(name, description);
    return await this.charactersRepository.save(newCharacter);
  }

  async getAllCharacters(): Promise<Character[]> {
    const characters = this.charactersRepository.find();
    return characters;
  }

  async getSingleCharacter(id: string): Promise<Character> {
    const found = await this.charactersRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException('character not found');
    } else {
      return found;
    }
  }

  async updateCharacter(id: string, name: string, description: string): Promise<Character> {
    const character = await this.getSingleCharacter(id);
    if (name) {
      character.name = name;
      await this.charactersRepository.save(character);
    }
    if (description) {
      character.description = description;
      await this.charactersRepository.save(character);
    }
    return character;
  }

  async deleteCharacter(id: string): Promise<string> {
    await this.charactersRepository.delete(id);
    return `character with ID ${id} has been deleted`;
  }
}
