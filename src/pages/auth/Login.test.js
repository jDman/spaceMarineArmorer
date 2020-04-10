import React from 'react';
import renderer from 'react-test-renderer';

import Login from './Login';

describe('<Login />', () => {
  it('renders Login page', () => {
    const component = renderer.create(<Login />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('updates email form state on input change', () => {
    const component = renderer.create(<Login />);

    const componentInstance = component.root;

    componentInstance
      .findByProps({ name: 'email' })
      .props.onChange({ target: { value: 'test@test.com' } });

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('updates password form state on input change', () => {
    const component = renderer.create(<Login />);

    const componentInstance = component.root;

    componentInstance
      .findByProps({ name: 'password' })
      .props.onChange({ target: { value: '12345678' } });

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
