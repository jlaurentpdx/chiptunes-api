const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Hardware = require('../lib/models/Hardware');

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

  it('displays a list of hardware', async () => {
    const expected = [
      {
        id: expect.any(Number),
        device: 'Game Boy (original)',
        type: 'Console',
        manufacturer: 'Nintendo',
        chip: 'GB-Z80',
        channels: 4,
      },
    ];

    const resp = await request(app).get('/api/v1/hardware');

    expect(resp.body).toEqual(expect.arrayContaining(expected));
  });

  it('displays a single entry from hardware by ID', async () => {
    const expected = {
      id: 1,
      device: 'Game Boy (original)',
      type: 'Console',
      manufacturer: 'Nintendo',
      chip: 'GB-Z80',
      channels: 4,
    };

    const resp = await request(app).get('/api/v1/hardware/1');

    expect(resp.body).toEqual(expected);
  });

  it('routes to 404 error when ID does not match a table entry', async () => {
    const resp = await request(app).get('/api/v1/hardware/fake-hardware');

    expect(resp.status).toEqual(404);
  });

  it('updates an existing entry in the hardware table', async () => {
    const expected = {
      id: 1,
      device: 'Game Boy (1989)',
      type: 'Console',
      manufacturer: 'Nintendo',
      chip: 'GB-Z80',
      channels: 4,
    };

    const resp = await request(app)
      .patch('/api/v1/hardware/1')
      .send({ device: 'Game Boy (1989)' });

    expect(resp.body).toEqual(expected);
  });

  it('deletes an existing entry in the hardware table', async () => {
    const expected = await Hardware.findById(2);
    const resp = await request(app).delete('/api/v1/hardware/2');

    expect(resp.body).toEqual(expected);

    const hardwareExcludeDeleted = await Hardware.findAll();

    expect(hardwareExcludeDeleted).not.toContainEqual(expected);
  });
});