import React from 'react';
import renderer from 'react-test-renderer';
import ArmorAdmin from './ArmorAdmin';

describe('<ArmorAdmin />', () => {
  it('renders ArmorAdmin page component', () => {
    const component = renderer.create(<ArmorAdmin />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
