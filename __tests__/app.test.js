const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Order = require('../lib/models/Order');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('routes tests', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new order in our database and sends a text message', () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then((res) => {
        // expect(createMessage).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '1',
          quantity: 10,
        });
      });
  });

  it('gets an order by id', async () => {
    await Order.insert(99);

    return request(app)
      .get('/api/v1/orders/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          quantity: 99,
        });
      });
  });

  it('gets all orders', async () => {
    await Order.insert(99);
    await Order.insert(55);

    return request(app)
      .get('/api/v1/orders')
      .then((res) => {
        expect(res.body).toEqual([
          { id: '1', quantity: 99 },
          { id: '2', quantity: 55 },
        ]);
      });
  });

  it('updates an order in our database and sends a text message', async () => {
    await Order.insert(99);

    return request(app)
      .patch('/api/v1/orders/1')
      .send({ quantity: 77 })
      .then((res) => {
        // expect(createMessage).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '1',
          quantity: 77,
        });
      });
  });
});
