import { Test } from '@nestjs/testing';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import * as request from 'supertest';
import { INestApplication, NotFoundException } from '@nestjs/common';
import { AppModule } from '../app.module';
//import { v4 as uuid } from 'uuid';

const initialValues = [
  {
    name: 'Aslaug',
    description: 'warrior queen'
  },
  {
    name: 'Ivar the Boneless',
    description: 'commander of the Great Heathen Army'
  },
  {
    name: 'Lagertha the Sheildmaiden',
    description: 'aka Hlaógerór'
  },
  {
    name: 'Ragnar Lothbrok',
    description: 'aka Ragnard Sigurdsson'
  }
];

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

    const list = await request(app.getHttpServer()).get('/characters');
    const listLength = list.body.length;
    if (listLength === 0) {
      for (let i = 0; i < initialValues.length; i++) {
        await request(app.getHttpServer()).post('/characters').send(initialValues[i]);
      }
    } else {
      for (let i = 0; i < listLength; i++) {
        await request(app.getHttpServer()).delete(`/characters/${listLength[i]}`);
      }
    }
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
    const response = await request(app.getHttpServer()).get('/characters/');
    const firstCharacter = response.body[0].id;

    const result = { id: firstCharacter, name: 'Aslaug', description: 'warrior queen' };

    await request(app.getHttpServer())
      .get(`/characters/${firstCharacter}`)
      .expect((response) => {
        expect(response.body).toEqual(result);
        expect(response.ok);
        console.log(response.body);
      });
  });

  it('#addCharacter', async () => {
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
    const response = await request(app.getHttpServer()).get('/characters/');
    const secondCharacter = response.body[2].id;
    console.log(secondCharacter);

    const result = { id: secondCharacter, name: 'new name', description: 'new description' };

    const toUpdate = await request(app.getHttpServer()).patch(`/characters/${secondCharacter}`).send({
      name: 'new name',
      description: 'new description'
    });
    expect(toUpdate.body).toEqual(result);
    expect(toUpdate.ok);

    await request(app.getHttpServer())
      .get(`/characters/${secondCharacter}`)
      .expect((response) => {
        expect(response.body).toEqual(result);
        console.log(response.body);
      });
  });

  it('#deleteCharacter', async () => {
    const response = await request(app.getHttpServer()).get('/characters/');
    const deletedID = response.body[3].id;

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
