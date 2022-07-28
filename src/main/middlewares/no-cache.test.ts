import request from 'supertest';
import { noCache } from './no-cache';
import app from '../config/app';

describe('NO CACHE Middleware', () => {
  test('Should disable CACHE', async () => {
    app.get('/test-no-cache', noCache, (req, res) => {
      res.send();
    });
    await request(app)
      .get('/test-no-cache')
      .expect(
        'Cache-Control',
        'no-store, no-cache, must-revalidate, proxy-revalidate'
      )
      .expect('Pragma', 'no-cache')
      .expect('Expires', '0')
      .expect('Surrogate-Control', 'no-store');
  });
});
