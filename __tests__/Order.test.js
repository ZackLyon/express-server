const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const Order = require('../lib/models/Order');

describe('models tests', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('inserts an order in our database', async () => {
    await Order.insert(99);

    const actual = await Order.getAll();
    const expected = [{ id: '1', quantity: 99 }];

    expect(actual).toEqual(expected);
  });

  it('gets all orders in our database', async () => {
    await Order.insert(99);
    await Order.insert(55);

    const actual = await Order.getAll();
    const expected = [
      { id: '1', quantity: 99 },
      { id: '2', quantity: 55 },
    ];

    expect(actual).toEqual(expected);
  });

  it('gets an order by id in our database', async () => {
    await Order.insert(99);

    const actual = await Order.getById(1);
    const expected = { id: '1', quantity: 99 };

    expect(actual).toEqual(expected);
  });

  it('updates an order in our database', async () => {
    await Order.insert(99);
    await Order.update(1, 77);

    const actual = await Order.getAll();
    const expected = [{ id: '1', quantity: 77 }];

    expect(actual).toEqual(expected);
  });

  it('updates an order in our database', async () => {
    await Order.insert(99);
    await Order.update(1, 77);

    const actual = await Order.getAll();
    const expected = [{ id: '1', quantity: 77 }];

    expect(actual).toEqual(expected);
  });

  it('deletes an order in our database', async () => {
    await Order.insert(99);
    await Order.insert(77);

    await Order.delete(2);
    const actual = await Order.getAll();
    const expected = [{ id: '1', quantity: 99 }];

    expect(actual).toEqual(expected);
  });
});
