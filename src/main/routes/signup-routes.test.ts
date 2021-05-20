import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Should returns an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Francisco',
        email: 'fran.p.s@hotmail.com',
        passwor: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
