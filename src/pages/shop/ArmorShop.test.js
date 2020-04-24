import React from 'react';
import renderer, { act } from 'react-test-renderer';

import ArmorShop from './ArmorShop';

describe('<ArmorShop />', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
  });

  afterEach(() => {
    global.fetch.mockClear();
    delete global.fetch;
  });

  it('should render ArmorShop page with empty armor array returned from server', async () => {
    const result = {
      data: {
        armors: [],
        totalItems: 0,
      },
      json: function () {
        return this.data;
      },
    };
    const component = renderer.create(<ArmorShop />);

    await act(async () => {
      await fetch.mockReturnValue(Promise.resolve(result));
    });

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render ArmorShop page with results returned from server for armor', async () => {
    const result = {
      data: {
        armors: [
          {
            createdBy: {
              userId: '5e70dfb438cee83fd9e004fd',
              userName: 'Freddy',
            },
            stock: 5,
            shield: 50,
            discount: 30,
            _id: '5e941bab2c9afa63aa5cadb3',
            type: 'helmet',
            name: 'test',
            cost: 200,
            protection: 'low',
            quality: 'low',
            description: 'Low tier trash',
            company: 'starscape_systems',
            createdAt: '2020-04-13T07:58:35.164Z',
            updatedAt: '2020-04-13T07:58:35.164Z',
            __v: 0,
          },
        ],
        totalItems: 1,
      },
      json: function () {
        return this.data;
      },
    };
    const component = renderer.create(<ArmorShop />);

    await act(async () => {
      await fetch.mockReturnValue(Promise.resolve(result));
    });

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render ArmorShop page with results returned from server for armor with no stock', async () => {
    const result = {
      data: {
        armors: [
          {
            createdBy: {
              userId: '5e70dfb438cee83fd9e004fd',
              userName: 'Freddy',
            },
            stock: 0,
            shield: 50,
            discount: 30,
            _id: '5e941bab2c9afa63aa5cadb3',
            type: 'helmet',
            name: 'test',
            cost: 200,
            protection: 'low',
            quality: 'low',
            description: 'Low tier trash',
            company: 'starscape_systems',
            createdAt: '2020-04-13T07:58:35.164Z',
            updatedAt: '2020-04-13T07:58:35.164Z',
            __v: 0,
          },
        ],
        totalItems: 1,
      },
      json: function () {
        return this.data;
      },
    };
    const component = renderer.create(<ArmorShop />);

    await act(async () => {
      await fetch.mockReturnValue(Promise.resolve(result));
    });

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
