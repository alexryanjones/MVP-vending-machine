import request from 'supertest';
import jwt from 'jsonwebtoken';
import express from 'express';
import router from '../router.js';
import users from '../models/users';
import mockUser from './mock-data/users.json';

const server = express();
server.use(express.json());
server.use('/', router);

describe('POST /deposit', () => {
  let token;

  beforeAll(async () => {
    const user = await users.create(mockUser[0]);

    const payload = {
      id: user._id,
      username: user.username,
      password: user.password,
      role: user.role,
    };
    token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
  });

  afterAll(async () => {
    await users.deleteOne({ username: mockUser[0].username });
  });

  it('should deposit the specified amount for an authorized user', async () => {
    const response = await request(server)
      .post('/deposit')
      .set('Authorization', `Bearer ${token}`)
      .send({ amount: 10 });

    expect(response.statusCode).toBe(200);
    expect(response.body.deposit).toBe(510);
  });

  it('should return an error if the user is not found', async () => {
    const fakeToken = jwt.sign(
      { username: 'nonexistentuser' },
      process.env.ACCESS_TOKEN_SECRET
    );
    const response = await request(server)
      .post('/deposit')
      .set('Authorization', `Bearer ${fakeToken}`)
      .send({ amount: 10 });

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('User not found');
  });

  it('should return an error if the user is not authorized to deposit coins', async () => {
    const sellerUser = await users.create(mockUser[1]);
    const sellerToken = jwt.sign(
      {
        id: sellerUser._id,
        username: sellerUser.username,
        password: sellerUser.password,
        role: sellerUser.role,
      },
      process.env.ACCESS_TOKEN_SECRET
    );

    const response = await request(server)
      .post('/deposit')
      .set('Authorization', `Bearer ${sellerToken}`)
      .send({ amount: 10 });

    expect(response.statusCode).toBe(403);
    expect(response.body.message).toBe(
      'You are not authorized to deposit coins'
    );

    await users.deleteOne({ username: mockUser[1].username });
  });

  it('should return an error if the coin denomination is invalid', async () => {
    const response = await request(server)
      .post('/deposit')
      .set('Authorization', `Bearer ${token}`)
      .send({ amount: 1 });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Invalid coin denomination');
  });
});
