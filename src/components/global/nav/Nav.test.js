import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter as Router } from 'react-router-dom';

import Nav from './Nav';

describe('<Nav />', () => {
  it('renders Nav component without isAuth props', () => {
    const component = renderer.create(
      <Router>
        <Nav />
      </Router>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Nav component with isAuth props', () => {
    const component = renderer.create(
      <Router>
        <Nav isAuth={true} />
      </Router>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
