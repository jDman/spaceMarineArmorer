import React from 'react';
import renderer from 'react-test-renderer';

import ArmorShopItem from './ArmorShopItem';

describe('<ArmorShopItem />', () => {
  it('should render with props passed in', () => {
    const armor = {
      id: '123',
      name: 'Legatron',
      type: 'leg',
      description: 'Leg Armor that is basic',
      company: 'orian_labs',
      quality: 'low',
      protection: 'low',
      shield: 0,
      discount: 0,
      cost: 100,
      stock: 0,
      createdBy: 'Freddy',
      config: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          name: 'quantity',
          min: 0,
          max: 0,
          step: 1,
        },
        value: 0,
        valid: false,
        validation: { min: 1 },
        touched: false,
      },
    };

    const component = renderer.create(
      <ArmorShopItem
        armor={armor}
        inputChangedHandler={() => {}}
        addToCart={() => {}}
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
