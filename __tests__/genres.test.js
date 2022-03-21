const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('genres routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('adds a new entry to the genres table', async () => {
    const expected = {
      genre: 'Nintendocore',
      description:
        'Where post-hardcore meets chiptunes. Nintendocore mixes PSG sounds and samples with rock and metal instruments and influence.',
      artists: ['Horse the Band', 'The Deprecation Guild'],
    };

    const resp = await request(app).post('/api/v1/genres').send(expected);

    expect(resp.body).toEqual({ id: expect.any(Number), ...expected });
  });

  it('displays the list of genres', async () => {
    const expected = [
      {
        id: expect.any(Number),
        genre: 'Chiptunes',
        description:
          'A broad class of music made with PSGs or their emulations, often in the form of 8-bit sonic wizardry.',
        artists: ['Chip Tanaka', 'Pixelh8'],
      },
    ];

    const resp = await request(app).get('/api/v1/genres');

    expect(resp.body).toEqual(expect.arrayContaining(expected));
  });

  it('displays a single entry from genres by ID', async () => {
    const expected = {
      id: 1,
      genre: 'Chiptunes',
      description:
        'A broad class of music made with PSGs or their emulations, often in the form of 8-bit sonic wizardry.',
      artists: ['Chip Tanaka', 'Pixelh8'],
    };

    const resp = await request(app).get('/api/v1/genres/1');

    expect(resp.body).toEqual(expected);
  });

  it('routes to 404 error when ID does not match a table entry', async () => {
    const resp = await request(app).get('/api/v1/genres/fake-genre');

    expect(resp.status).toEqual(404);
  });
});
