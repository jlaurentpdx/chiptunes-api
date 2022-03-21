const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('software routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('adds a new entry to the software table', async () => {
    const expected = {
      program: 'MilkyTracker',
      recentVersion: '1.03',
      type: 'tracker',
      developer: 'Lyubomyr Lisen',
    };
    const resp = await request(app).post('/api/v1/software').send(expected);

    expect(resp.body).toEqual({ id: expect.any(Number), ...expected });
  });

  it('displays the list of software', async () => {
    const expected = [
      {
        id: expect.any(Number),
        program: 'LittleSoundDJ (LSDJ)',
        recentVersion: 'v9.2.6',
        type: 'Sequencer',
        developer: 'Johan Kotlinski',
      },
    ];
    const resp = await request(app).get('/api/v1/software');

    expect(resp.body).toEqual(expect.arrayContaining(expected));
  });

  it('displays a single entry in the software table', async () => {
    const expected = {
      id: 1,
      program: 'LittleSoundDJ (LSDJ)',
      recentVersion: 'v9.2.6',
      type: 'Sequencer',
      developer: 'Johan Kotlinski',
    };
    const resp = await request(app).get('/api/v1/software/1');

    expect(resp.body).toEqual(expected);
  });

  it('routes to 404 error when ID does not match a table entry', async () => {
    const resp = await request(app).get('/api/v1/software/fake-software');

    expect(resp.status).toEqual(404);
  });
});
