import { Test } from '@nestjs/testing';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';
import { v4 as uuid } from 'uuid';

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
    const characterID = response.body[0].id;

    const result = {
      id: characterID,
      name: 'Aslaug',
      description: 'warrior queen'
    };

    await request(app.getHttpServer())
      .get(`/characters/${characterID}`)
      .expect((response) => {
        expect(response.body).toEqual(result);
        expect(response.ok);
        console.log(response.body);
      });
  });

  it('#addCharacter', async () => {
    const response = await request(app.getHttpServer()).post('/characters').send({
      name: 'NEWLY ADDED NAME',
      description: 'NEWLY ADDED DESCRIPTION'
    });
    expect(response.body).toEqual({
      id: expect.any(String),
      name: 'NEWLY ADDED NAME',
      description: 'NEWLY ADDED DESCRIPTION'
    });
  });

  it('#updateCharacter', async () => {
    const response = await request(app.getHttpServer()).get('/characters/');
    const character = response.body.find(({ name }) => name === 'Ivar the Boneless');
    const characterID = character.id;
    console.log(characterID);

    const result = {
      id: characterID,
      name: 'NEW Ivar the Boneless',
      description: 'NEW commander of the Great Heathen Army'
    };

    const toUpdate = await request(app.getHttpServer()).patch(`/characters/${characterID}`).send({
      name: 'NEW Ivar the Boneless',
      description: 'NEW commander of the Great Heathen Army'
    });
    expect(toUpdate.body).toEqual(result);
    expect(toUpdate.ok);

    await request(app.getHttpServer())
      .get(`/characters/${characterID}`)
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
