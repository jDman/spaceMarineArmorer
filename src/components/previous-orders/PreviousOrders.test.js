import React from 'react';
import renderer from 'react-test-renderer';

import PreviousOrders from './PreviousOrders';

describe('<PreviousOrders />', () => {
  it('should render component and display list of previous orders', () => {
    const previousOrders = [
      {
        _id: '5e98106449355843575cf0c1',
        userId: '5e9435b51268b871ff874b8f',
        items: [
          {
            _id: '5e98106449355843575cf0c2',
            armor: {
              createdBy: {
                userId: '5e70dfb438cee83fd9e004fd',
                userName: 'Freddy',
              },
              stock: 4,
              shield: 10,
              discount: 10,
              _id: '5e96c3db8beefe1130ce80ff',
              type: 'body',
              cost: 200,
              protection: 'medium',
              quality: 'low',
              description: 'This is body armor...',
              company: 'adrax_corp',
              createdAt: '2020-04-15T08:20:43.170Z',
              updatedAt: '2020-04-15T08:20:43.170Z',
              __v: 0,
            },
            quantity: 2,
          },
          {
            _id: '5e98106449355843575cf0c3',
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
            quantity: 1,
          },
        ],
        totalCost: 600,
        createdAt: '2020-04-16T07:59:32.514Z',
        updatedAt: '2020-04-16T07:59:32.514Z',
        __v: 0,
      },
    ];

    const component = renderer.create(
      <PreviousOrders previousOrders={previousOrders} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
