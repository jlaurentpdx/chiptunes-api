const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('albums table routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterEach(() => {
    pool.end();
  });

  it('adds a new entry to the albums table', async () => {
    const expected = {
      title: 'Videogames Ruined My Life',
      artist: 2,
      released: 2007,
      price: null,
      source: null,
    };

    const resp = await request(app).post('/api/v1/albums').send(expected);

    expect(resp.body).toEqual({ id: expect.any(Number), ...expected });
  });
});
