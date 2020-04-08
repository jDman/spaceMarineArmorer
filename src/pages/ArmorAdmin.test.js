import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter as Router } from 'react-router-dom';
import ArmorAdmin from './ArmorAdmin';

test('renders ArmorAdmin page component', () => {
  const component = renderer.create(
    <Router>
      <ArmorAdmin />
    </Router>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
