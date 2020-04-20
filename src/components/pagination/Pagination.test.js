import React from 'react';

import renderer from 'react-test-renderer';

import Pagination from './Pagination';

describe('<Pagination />', () => {
  it('should render with both hasPrevPage and hasNextPage', () => {
    const component = renderer.create(
      <Pagination
        hasPrevPage={true}
        hasNextPage={true}
        currentPage={1}
        nextClickHandler={() => {}}
        prevClickHandler={() => {}}
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render with just hasPrevPage', () => {
    const component = renderer.create(
      <Pagination
        hasPrevPage={true}
        hasNextPage={false}
        currentPage={1}
        nextClickHandler={() => {}}
        prevClickHandler={() => {}}
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render with just hasNextPage', () => {
    const component = renderer.create(
      <Pagination
        hasPrevPage={false}
        hasNextPage={true}
        currentPage={1}
        nextClickHandler={() => {}}
        prevClickHandler={() => {}}
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
