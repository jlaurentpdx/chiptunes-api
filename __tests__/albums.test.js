const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('albums table routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
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

  it('displays the list of albums', async () => {
    const expected = [
      {
        id: expect.any(Number),
        title: 'Domani',
        artist: 1,
        released: 2021,
        price: 13.29,
        source: 'Bandcamp',
      },
      {
        id: expect.any(Number),
        title: 'Domingo',
        artist: 1,
        released: 2020,
        price: 11.74,
        source: 'Bandcamp',
      },
    ];

    const resp = await request(app).get('/api/v1/albums');

    expect(resp.body).toEqual(expected);
  });

  it('displays a single entry from albums by ID', async () => {
    const expected = {
      id: expect.any(Number),
      title: 'Domingo',
      artist: 1,
      released: 2020,
      price: 11.74,
      source: 'Bandcamp',
    };

    const resp = await request(app).get('/api/v1/albums/2');

    expect(resp.body).toEqual(expected);
  });
});
