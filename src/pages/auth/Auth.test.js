import React from 'react';
import renderer from 'react-test-renderer';

import Auth from './Auth';

describe('<Auth />', () => {
  it('renders Auth component and children', () => {
    const component = renderer.create(
      <Auth>
        <p>Tested</p>
      </Auth>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
