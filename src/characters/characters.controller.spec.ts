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
    const result = { id: '388b9f3b-2dcf-4bcd-a09b-4594cd68294c', name: 'Aslaug', description: 'warrior queen' };
    const response = await request(app.getHttpServer()).get('/characters/388b9f3b-2dcf-4bcd-a09b-4594cd68294c');
    expect.objectContaining(result);
    expect(response.ok);
  });

  test('#addCharacter', async () => {
    const response = await request(app.getHttpServer()).post('/characters').send({
      name: 'test name',
      description: 'test description'
    });
    expect(response.body).toEqual({
      id: expect.any(String),
      name: 'test name',
      description: 'test description'
    });
  });

  it('#updateCharacter', async () => {
    const updateID = 'e3a80c98-e15d-4d37-b699-be82bf28108d';
    const result = { id: updateID, name: 'new name', description: 'new description' };
    const response = await request(app.getHttpServer()).patch(`/characters/${updateID}`).send({
      name: 'new name',
      description: 'new description'
    });
    expect(response.body).toEqual(result);
    expect(response.ok);
  });

  it('#deleteCharacter', async () => {
    const deletedID = '41712d72-df7b-4440-9c6d-926e8fa61f4c';
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
