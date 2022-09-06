import { Test } from '@nestjs/testing';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { CharactersModule } from './characters.module';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';

describe('CharactersController', () => {
  let app: INestApplication;
  let controller: CharactersController;
  let service: CharactersService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    controller = module.get<CharactersController>(CharactersController);
    service = module.get<CharactersService>(CharactersService);

    app = module.createNestApplication();
    await app.init();
  });

  it('#getAllCharacters', async () => {
    const response = await request(app.getHttpServer()).get('/characters').expect(200).expect('Content-Type', /json/);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          description: expect.any(String)
        })
      ])
    );
  });

  it('#getSingleCharacter', async () => {
    const result = {
      id: '230a0569-7a21-45f5-88a3-3a7787c804e2',
      name: 'Aslaug',
      description: 'warrior queen'
    };
    const response = await request(app.getHttpServer()).get('/characters/230a0569-7a21-45f5-88a3-3a7787c804e2');
    expect.objectContaining(result);
    expect(response.ok);
  });

  test('#addCharacter', async () => {
    const response = await request(app.getHttpServer()).post('/characters').send({
      name: 'Added Character Name',
      description: 'Added Character Description'
    });
    expect(response.body).toEqual({
      id: expect.any(String),
      name: 'Added Character Name',
      description: 'Added Character Description'
    });
  });

  it('#updateCharacter', async () => {
    const updateID = '6d4f3793-b884-47d1-a9f3-419354e308ee';
    const result = { id: updateID, name: 'new name', description: 'new description' };
    const response = await request(app.getHttpServer()).patch(`/characters/${updateID}`).send({
      name: 'new name',
      description: 'new description'
    });
    expect(response.body).toEqual(result);
    expect(response.ok);
  });

  it('#deleteCharacter', async () => {
    const deletedID = 'edacb9d7-51d6-4996-bf47-3b22efb90684';
    await request(app.getHttpServer()).delete(`/characters/${deletedID}`);

    await request(app.getHttpServer())
      .get(`/characters/${deletedID}`)
      .expect((response) => {
        expect(response.body).toBeTruthy();
        expect(response.body.id).toBeUndefined();
      });

    await request(app.getHttpServer())
      .get(`/characters`)
      .expect((response) => {
        const characterList = response.body;
        const isObjectPresent = characterList.find((character) => character.id === deletedID);
        expect(isObjectPresent).toBeUndefined();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
