import request from 'supertest';
import app from '../config/app';
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';
import { Collection } from 'mongodb';
import { sign } from 'jsonwebtoken';
import env from '../config/env';

let surveyCollection: Collection;
let accountCollection: Collection;

describe('Survey Result Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.deleteMany({});
    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  const makeAccessToken = async (): Promise<string> => {
    const res = await accountCollection.insertOne({
      name: 'Francisco',
      email: 'fran.p.s@hotmail.com',
      password: '123',
    });
    const id = res.ops[0]._id;
    const accessToken = sign({ id }, env.jwtSecret);
    await accountCollection.updateOne(
      { _id: id },
      {
        $set: {
          accessToken,
        },
      }
    );
    return accessToken;
  };

  describe('PUT /surveys/:surveyId/results', () => {
    test('Should returns 403 on save survey result without access token', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answer: 'any_answer',
        })
        .expect(403);
    });

    test('Should returns 200 on save survey result with access token', async () => {
      const accessToken = await makeAccessToken();
      const res = await surveyCollection.insertOne({
        question: 'Question',
        answers: [
          {
            image: 'http://image-name.com',
            answer: 'Answer 1',
          },
          {
            answer: 'Answer 2',
          },
        ],
        date: new Date(),
      });
      await request(app)
        .put(`/api/surveys/${res.ops[0]._id}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'Answer 1',
        })
        .expect(200);
    });
  });

  describe('GET /surveys/:surveyId/results', () => {
    test('Should returns 403 on load survey result without access token', async () => {
      await request(app).get('/api/surveys/any_id/results').expect(403);
    });

    test('Should returns 200 on save survey result with access token', async () => {
      const accessToken = await makeAccessToken();
      const res = await surveyCollection.insertOne({
        question: 'Question',
        answers: [
          {
            image: 'http://image-name.com',
            answer: 'Answer 1',
          },
          {
            answer: 'Answer 2',
          },
        ],
        date: new Date(),
      });
      await request(app)
        .get(`/api/surveys/${res.ops[0]._id}/results`)
        .set('x-access-token', accessToken)
        .expect(200);
    });
  });
});
