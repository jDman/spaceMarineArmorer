import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter as Router } from 'react-router-dom';

import App from './App';

describe('<App />', () => {
  it('renders App component', () => {
    const component = renderer.create(
      <Router>
        <App />
      </Router>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
