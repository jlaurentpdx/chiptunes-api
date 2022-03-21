const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('hardware routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('adds a new entry to the hardware table', async () => {
    const expected = {
      device: 'MEGA fm',
      type: 'Synthesizer',
      manufacturer: 'Twisted Electrons',
      chip: 'YM2612',
      channels: 12,
    };

    const resp = await request(app).post('/api/v1/hardware').send(expected);

    expect(resp.body).toEqual({ id: expect.any(Number), ...expected });
  });
});
