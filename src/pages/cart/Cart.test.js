import React from 'react';
import renderer, { act } from 'react-test-renderer';

import Cart from './Cart';

describe('<Cart />', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
  });

  afterEach(() => {
    global.fetch.mockClear();
    delete global.fetch;
  });

  it('should render Cart page with empty cart items array returned from server', async () => {
    const result = {
      data: {
        items: [],
      },
      json: function () {
        return this.data;
      },
    };

    const component = renderer.create(<Cart />);

    await act(async () => {
      await fetch.mockReturnValue(Promise.resolve(result));
    });

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render Cart page with cart items array returned from server', async () => {
    const result = {
      data: {
        items: [
          {
            _id: '5e9584a3e78821c2d76c8900',
            armor: {
              createdBy: {
                userId: '5e70dfb438cee83fd9e004fd',
                userName: 'Freddy',
              },
              stock: 5,
              shield: 50,
              discount: 30,
              _id: '5e941bab2c9afa63aa5cadb3',
              type: 'helmet',
              cost: 200,
              protection: 'low',
              quality: 'low',
              description: 'Low tier trash',
              company: 'starscape_systems',
              createdAt: '2020-04-13T07:58:35.164Z',
              updatedAt: '2020-04-13T07:58:35.164Z',
              __v: 0,
            },
            quantity: 3,
          },
        ],
      },
      json: function () {
        return this.data;
      },
    };

    const component = renderer.create(<Cart />);

    await act(async () => {
      await fetch.mockReturnValue(Promise.resolve(result));
    });

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
