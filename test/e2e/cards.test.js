require('dotenv').config();
const connect = require('../../lib/utils/connect');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../lib/app');

beforeAll(() => {
  return connect();
});

afterAll(() => {
  return mongoose.connection.close();
});

describe('Card route tests, database queries', () => {
  it('gets a card by name', async() => {
    const animar = await request(app)
      .get('/api/v1/cards?name=Animar,%20Soul%20of%20Elements');
    expect(animar.body[0].name).toEqual('Animar, Soul of Elements');
    expect(animar.body[0].reprint).toBeFalsy();
  });
  it('gets a card CASE INSENSITIVE', async() => {
    const animar = await request(app)
      .get('/api/v1/cards?name=animar,%20soul%20of%20elements');
    expect(animar.body[0].name).toEqual('Animar, Soul of Elements');
    expect(animar.body[0].reprint).toBeFalsy();
  });
  it('gets a card PARTIAL NAME', async() => {
    const animar = await request(app)
      .get('/api/v1/cards?name=animar');
    expect(animar.body[0].name).toEqual('Animar, Soul of Elements');
    expect(animar.body[0].reprint).toBeFalsy();
  });
  it('gets a card MISSING COMMA', async() => {
    const animar = await request(app)
      .get('/api/v1/cards?name=animar%20soul%20of%20elements');
    expect(animar.body[0].name).toEqual('Animar, Soul of Elements');
    expect(animar.body[0].reprint).toBeFalsy();
  });
  // it('gets all black cards', async() => {
  //   const blackCards = await request(app)
  //     .get('/api/v1/cards?colors=B&exclusivity=and&exclude=yes');
  //   for(let i = 0; i < 50; i++) {
  //     expect(blackCards.body[i].colors).toEqual(['B']);
  //   }
  // });
  // it('gets cards that are black OR red', async() => {
  //   const blackOrRedCards = await request(app)
  //     .get('/api/v1/cards?colors=B,R&exclusivity=and&exclude=yes');
  //     console.log(blackOrRedCards);
  //   for(let i = 0; i < 50; i++) {
  //     expect(blackOrRedCards.body[i].colors).toEqual(['B'] || ['R']);
  //   }
  // });
});
