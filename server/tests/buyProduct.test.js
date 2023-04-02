import request from 'supertest';
import jwt from 'jsonwebtoken';
import express from 'express';
import router from '../router.js';
import users from '../models/users';
import products from '../models/products';
import mockUser from './mock-data/users.json';
import mockProduct from './mock-data/products.json';

const server = express();
server.use(express.json());
server.use('/', router);

describe('PUT /buy-product', () => {
  let token;
  let product;

  beforeAll(async () => {
    const user = await users.create(mockUser[0]);

    const payload = {
      id: user._id,
      username: user.username,
      password: user.password,
      role: user.role,
    };
    token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    product = await products.create(mockProduct[0]);
  });

  afterAll(async () => {
    await users.deleteOne({ username: mockUser[0].username });
    await products.deleteOne({ productName: mockProduct[0].productName });
  });

  const buyProduct = async (token, productName) => {
    const response = await request(server)
      .put('/buy-product')
      .set('Authorization', `Bearer ${token}`)
      .send({ productName });

    return response;
  };

  it('should buy the product for an authorized buyer with enough deposit', async () => {
    const response = await buyProduct(token, mockProduct[0].productName);

    const updatedUser = await users.findOne({ username: mockUser[0].username });
    const updatedProduct = await products.findOne({
      productName: mockProduct[0].productName,
    });

    expect(response.body).toBeDefined();
    expect(updatedUser.deposit).toBe(485);
    expect(updatedProduct.amountAvailable).toBe(4);
  });

  it('should return an error if the user is not authorized to buy products', async () => {
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

    const response = await buyProduct(sellerToken, mockProduct[0].productName);
    expect(response.body.message).toBe('You are not authorized to buy products');
    expect(response.statusCode).toBe(403);

    await users.deleteOne({ username: mockUser[1].username });
  });

  it('should return an error if the product is not found', async () => {
    const response = await buyProduct(token, 'Nonexistent Product');
    expect(response.body.message).toBe('Product not found');
    expect(response.statusCode).toBe(404);
  });

  it('should return an error if the buyer does not have enough deposit', async () => {
    const brokeUser = await users.create(mockUser[2]);
    const brokeUserToken = jwt.sign(
      {
        id: brokeUser._id,
        username: brokeUser.username,
        password: brokeUser.password,
        role: brokeUser.role,
      },
      process.env.ACCESS_TOKEN_SECRET
    );
    const response = await buyProduct(brokeUserToken, mockProduct[0].productName);
    expect(response.body.message).toBe('Not enough money in your deposit');
    expect(response.statusCode).toBe(400);

    await users.deleteOne({ username: mockUser[2].username });
  });
});
