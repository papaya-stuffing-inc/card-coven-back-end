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
    console.log('ANIMAR', animar.body);
    expect(animar.body[0].name).toEqual('Animar, Soul of Elements');
    expect(animar.body[0].reprint).toBeFalsy();
  });
});
