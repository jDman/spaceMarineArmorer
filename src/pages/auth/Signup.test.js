import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter as Router } from 'react-router-dom';

import Signup from './Signup';

test('renders Signup page', () => {
  const component = renderer.create(
    <Router>
      <Signup />
    </Router>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
