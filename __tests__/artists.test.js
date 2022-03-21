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
        id: expect.any(Number),
        artist: 'Chip Tanaka',
        originYear: 1980,
        isActive: true,
      },
    ];

    const resp = await request(app).get('/api/v1/artists');

    expect(resp.body).toEqual(expect.arrayContaining(expected));
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
    const resp = await request(app).get('/api/v1/artists/fake-entry');

    expect(resp.status).toEqual(404);
  });

  it('updates an existing entry in the artists table', async () => {
    const expected = {
      id: expect.any(Number),
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
    const expected = await Artist.findById(3);
    const resp = await request(app).delete(`/api/v1/artists/${expected.id}`);

    expect(resp.body).toEqual(expected);

    const artistsExcludeDeleted = await Artist.findAll();

    expect(artistsExcludeDeleted).not.toContainEqual(expected);
  });
});
