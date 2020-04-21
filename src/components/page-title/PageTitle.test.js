import React from 'react';
import renderer from 'react-test-renderer';

import PageTitle from './PageTitle';

describe('<PageTitle />', () => {
  it('should display the title passed as a prop', () => {
    const title = 'TEST';

    const component = renderer.create(<PageTitle title={title} />);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
