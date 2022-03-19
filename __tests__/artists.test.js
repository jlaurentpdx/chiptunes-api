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
});
