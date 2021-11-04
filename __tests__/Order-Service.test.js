const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const Order = require('../lib/models/Order');
const OrderService = require('../lib/services/OrderService.js');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('Order Service tests', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new order in our database and sends a text message', async () => {
    const actual = await OrderService.createOrder(99);
    const expected = { id: '1', quantity: 99 };

    expect(actual).toEqual(expected);
  });

  it('updates an order and sends a text message', async () => {
    await OrderService.createOrder(99);
    const actual = await OrderService.update(1, 77);
    const expected = { id: '1', quantity: 77 };

    expect(actual).toEqual(expected);
  });

  it('deletes an order and sends a text message', async () => {
    await OrderService.createOrder(99);
    const actual = await OrderService.delete(1);
    const expected = { id: '1', quantity: 99 };

    expect(actual).toEqual(expected);
  });
});
