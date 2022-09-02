import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Characters } from '../characters.entity';

@Injectable()
export class CharactersRepository {
  constructor(
    @InjectRepository(Characters)
    private readonly charactersRepository: Repository<Characters>
  ) {}
}
