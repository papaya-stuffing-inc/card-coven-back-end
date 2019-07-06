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
  it('gets cards that INCLUDE B', async() => {
    const blackCards = await request(app)
      .get('/api/v1/cards?colors=B&exact=no&exclude=no');
    for(let i = 0; i < 50; i++) {
      expect(blackCards.body[i].colors.includes('B')).toBeTruthy();
    }
  });
  it('gets cards that INCLUDE B or R', async() => {
    const blackOrRedCards = await request(app)
      .get('/api/v1/cards?colors=B,R&exact=no&exclude=no');
    for(let i = 0; i < 50; i++) {
      expect((blackOrRedCards.body[i].colors.includes('B') || blackOrRedCards.body[i].colors.includes('R'))).toBeTruthy();
    }
  });
  it('gets cards that INCLUDE B EXACT', async() => {
    const blackCards = await request(app)
      .get('/api/v1/cards?colors=B&exact=yes&exclude=no');
    for(let i = 0; i < 50; i++) {
      expect(blackCards.body[i].colors.includes('B')).toBeTruthy();
    }
  });
  it('gets cards that INCLUDE B or R EXACT', async() => {
    const blackOrRedCards = await request(app)
      .get('/api/v1/cards?colors=B,R&exact=yes&exclude=no');
    for(let i = 0; i < 50; i++) {
      expect(blackOrRedCards.body[i].colors.includes('B')).toBeTruthy();
      expect(blackOrRedCards.body[i].colors.includes('R')).toBeTruthy();
    }
  });
  it('gets cards that INCLUDE B EXCLUDE', async() => {
    const blackCards = await request(app)
      .get('/api/v1/cards?colors=B&exact=no&exclude=yes');
    for(let i = 0; i < 50; i++) {
      expect(blackCards.body[i].colors).toEqual(['B']);
    }
  });
  it('gets cards that INCLUDE B or R EXCLUDE', async() => {
    const blackOrRedCards = await request(app)
      .get('/api/v1/cards?colors=B,R&exact=no&exclude=yes');
    for(let i = 0; i < 50; i++) {
      expect((blackOrRedCards.body[i].colors.includes('B') || blackOrRedCards.body[i].colors.includes('R'))).toBeTruthy();
      expect(blackOrRedCards.body[i].colors.includes('G')).toBeFalsy();
      expect(blackOrRedCards.body[i].colors.includes('W')).toBeFalsy();
      expect(blackOrRedCards.body[i].colors.includes('U')).toBeFalsy();
    }
  });
  it('gets cards that INCLUDE B or R EXACT EXCLUDE', async() => {
    const blackOrRedCards = await request(app)
      .get('/api/v1/cards?colors=B,R&exact=yes&exclude=yes');
    for(let i = 0; i < 50; i++) {
      expect((blackOrRedCards.body[i].colors.includes('B') && blackOrRedCards.body[i].colors.includes('R'))).toBeTruthy();
      expect(blackOrRedCards.body[i].colors.includes('G')).toBeFalsy();
      expect(blackOrRedCards.body[i].colors.includes('W')).toBeFalsy();
      expect(blackOrRedCards.body[i].colors.includes('U')).toBeFalsy();
    }
  });
  it('gets cards by type_line TYPE', async() => {
    const landCards = await request(app)
      .get('/api/v1/cards?type_line=land');
    for(let i = 0; i < 50; i++) {
      expect(landCards.body[i].type_line.includes('Land')).toBeTruthy();
    }
  });
  it('gets cards by type_line SUBTYPE', async() => {
    const elementalCards = await request(app)
      .get('/api/v1/cards?type_line=elemental');
    for(let i = 0; i < elementalCards.body.length; i++) {
      expect(elementalCards.body[i].type_line.includes('Elemental')).toBeTruthy();
    }
  });
  it('gets a cards by TEXT', async() => {
    const destroyCards = await request(app)
      .get('/api/v1/cards?oracle_text=destroy+target+creature');
    for(let i = 0; i < destroyCards.body.length; i++) {
      expect(destroyCards.body[i].oracle_text.includes('Destroy Target Creature'));
    }
  });
  it('gets cards by SET, SINGLE', async() => {
    const standardCards = await request(app)
      .get('/api/v1/cards/?formats=standard');
    for(let i = 0; i < standardCards.body.length; i++) {
      expect(standardCards.body[i].legalities.standard).toEqual('legal');
    }
  });
  it('gets cards by SET, MULTIPLE', async() => {
    const standardOrCommanderCards = await request(app)
      .get('/api/v1/cards/?formats=standard,commander');
    for(let i = 0; i < standardOrCommanderCards.body.length; i++) {
      expect((standardOrCommanderCards.body[i].legalities.standard === 'legal' || standardOrCommanderCards.body[i].legalities.commander === 'legal')).toBeTruthy();
    }
  });
  it('gets cards by SET, MULTIPLE 2', async() => {
    const standardOrCommanderCards = await request(app)
      .get('/api/v1/cards/?formats=standard,commander&page=2');
    for(let i = 0; i < standardOrCommanderCards.body.length; i++) {
      expect((standardOrCommanderCards.body[i].legalities.standard === 'legal' || standardOrCommanderCards.body[i].legalities.commander === 'legal')).toBeTruthy();
    }
  });
  it('gets cards by SET, MULTIPLE 3', async() => {
    const standardOrCommanderCards = await request(app)
      .get('/api/v1/cards/?formats=standard,commander&page=3');
    for(let i = 0; i < standardOrCommanderCards.body.length; i++) {
      expect((standardOrCommanderCards.body[i].legalities.standard === 'legal' || standardOrCommanderCards.body[i].legalities.commander === 'legal')).toBeTruthy();
    }
  });
});

