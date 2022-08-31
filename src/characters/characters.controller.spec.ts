import { Test, TestingModule } from '@nestjs/testing';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { CharactersModule } from './characters.module';
import { AppModule } from '../app.module';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import assert from 'assert';
import { response } from 'express';
import { isStringObject } from 'util/types';

describe('CharactersController', () => {
  let app: INestApplication;
  let controller: CharactersController;
  let service: CharactersService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [CharactersModule]
    })
      .overrideProvider(CharactersService)
      .useValue(service)
      .compile();

    controller = module.get<CharactersController>(CharactersController);
    service = module.get<CharactersService>(CharactersService);

    app = module.createNestApplication();
    await app.init();
  });

  it('GET allCharacters', () => {
    return request(app.getHttpServer())
      .get('/characters')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              name: expect.any(String),
              description: expect.any(String)
            })
          ])
        );
        //console.log(response.body);
      });
  });

  it('GET getSingleCharacter', () => {
    const result = { id: '1', name: 'Aslaug', description: 'warrior queen' };
    return request(app.getHttpServer())
      .get('/characters/1')
      .then((response) => {
        expect(response.body).toEqual(result);
        console.log(response.body);
      });
  });

  it('POST addCharacter', () => {
    return request(app.getHttpServer())
      .post('/characters')
      .send({
        name: 'test name',
        description: 'test description'
      })
      .then((response) => {
        expect(response.body).toEqual({
          id: expect.any(String)
        });
        //console.log(response.body);
      });
  });

  it('PATCH updateCharacter', () => {
    const result = { id: '3', name: 'new name', description: 'new description' };
    return request(app.getHttpServer())
      .patch('/characters/3')
      .send({
        name: 'new name',
        description: 'new description'
      })
      .then((response) => {
        expect(response.body).toEqual(result);
        console.log(response.body);
      });
  });

  it('DELETE deleteCharacter', () => {
    return request(app.getHttpServer())
      .delete('/characters/1')
      .then((response) => {
        console.log(response.body);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
