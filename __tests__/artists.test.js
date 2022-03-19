const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Artist = require('../lib/models/Artist');

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
      {
        id: 3,
        artist: '+TEK',
        originYear: 2013,
        isActive: true,
      },
    ];

    const resp = await request(app).get('/api/v1/artists');

    expect(resp.body).toEqual(expected);
  });

  it('displays a single entry from artists by ID', async () => {
    const expected = {
      id: 1,
      artist: 'Chip Tanaka',
      originYear: 1980,
      isActive: true,
    };

    const resp = await request(app).get('/api/v1/artists/1');

    expect(resp.body).toEqual(expected);
  });

  it('routes to 404 error when ID does not match a table entry', async () => {
    const expected = {
      message: 'No matching table entry for ID: 99.',
      status: 404,
    };

    const resp = await request(app).get('/api/v1/artists/99');

    expect(resp.body).toEqual(expected);
  });

  it('updates an existing entry in the artists table', async () => {
    const expected = {
      id: 2,
      artist: 'Matthew Applegate',
      originYear: 1999,
      isActive: true,
    };

    const resp = await request(app)
      .patch('/api/v1/artists/2')
      .send({ artist: 'Matthew Applegate' });

    expect(resp.body).toEqual(expected);
  });

  it('deletes an existing entry in the artists table', async () => {
    const artistsInclude = await Artist.findAll();
    const expected = await Artist.findById(3);
    const resp = await request(app).delete(`/api/v1/artists/${expected.id}`);

    expect(resp.body).toEqual(expected);

    const artistsExclude = await Artist.findAll();

    expect(artistsInclude).not.toEqual(artistsExclude);
  });
});
