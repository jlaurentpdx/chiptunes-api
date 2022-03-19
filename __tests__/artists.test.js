const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('artists routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('adds a new entry to the artists table', async () => {
    const expected = {
      artist: 'Chipzel',
      originYear: 2009,
      isActive: true,
    };

    const resp = await request(app).post('/api/v1/artists').send(expected);

    expect(resp.body).toEqual({ id: expect.any(Number), ...expected });
  });

  it('displays the list of artists', async () => {
    const expected = [
      {
        id: 1,
        artist: 'Chip Tanaka',
        originYear: 1980,
        isActive: true,
      },
      {
        id: 2,
        artist: 'Pixelh8',
        originYear: 1999,
        isActive: true,
      },
    ];

    const resp = await request(app).get('/api/v1/artists');

    expect(resp.body).toEqual(expected);
  });

  it('displays a single artists info by ID', async () => {
    const expected = {
      id: 1,
      artist: 'Chip Tanaka',
      originYear: 1980,
      isActive: true,
    };

    const resp = await request(app).get('/api/v1/artists/1');

    expect(resp.body).toEqual(expected);
  });
});
