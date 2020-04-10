import React from 'react';
import renderer from 'react-test-renderer';

import Signup from './Signup';

describe('<Signup />', () => {
  it('renders Signup page', () => {
    const component = renderer.create(<Signup />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('updates email form state on input change', () => {
    const component = renderer.create(<Signup />);

    const componentInstance = component.root;

    componentInstance
      .findByProps({ name: 'email' })
      .props.onChange({ target: { value: 'test@test.com' } });

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('updates password form state on input change', () => {
    const component = renderer.create(<Signup />);

    const componentInstance = component.root;

    componentInstance
      .findByProps({ name: 'password' })
      .props.onChange({ target: { value: '12345678' } });

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('updates userName form state on input change', () => {
    const component = renderer.create(<Signup />);

    const componentInstance = component.root;

    componentInstance
      .findByProps({ name: 'userName' })
      .props.onChange({ target: { value: 'fred1' } });

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
