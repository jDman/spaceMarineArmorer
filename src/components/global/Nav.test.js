import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter as Router } from 'react-router-dom';

import Nav from './Nav';

test('renders Nav component', () => {
  const component = renderer.create(
    <Router>
      <Nav />
    </Router>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
