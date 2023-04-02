import request from 'supertest';
import bcrypt from 'bcrypt';
import express from 'express';
import router from '../router.js';
import users from '../models/users';
import mockUser from './mock-data/users.json';

const server = express();
server.use(express.json());
server.use('/', router);

describe('POST /add-user', () => {
  afterAll(async () => {
    await users.deleteOne({ username: mockUser[0].username });
  });

  const addUser = async (username, password, role) => {
    const response = await request(server)
      .post('/add-user')
      .send({ username, password, role });

    return response;
  };

  it('should add a user', async () => {
    const { username, password, role } = mockUser[0];

    const existingUser = await users.findOne({ username });
    expect(existingUser).toBeNull();

    const hashedPassword = await bcrypt.hash(password, 10);

    const response = await addUser(username, hashedPassword, role);
    expect(response.statusCode).toBe(200);
    expect(response.body.username).toBe(username);
    expect(response.body.password).toBeDefined();
    expect(response.body.deposit).toBe(0);
    expect(response.body.role).toBe(role);

    const addedUser = await users.findOne({ username });
    expect(addedUser).toBeDefined();
    expect(addedUser.username).toBe(username);
    expect(addedUser.password).toBeDefined();
    expect(addedUser.deposit).toBe(0);
    expect(addedUser.role).toBe(role);
  });

  it('should return an error if the username is already taken', async () => {
    const { username, password, role } = mockUser[0];

    const hashedPassword = await bcrypt.hash(password, 10);
    await users.create({
      username,
      password: hashedPassword,
      deposit: 0,
      role,
    });

    const response = await addUser(username, password, role);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Username already taken');
  });
});
