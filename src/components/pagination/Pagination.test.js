import React from 'react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';

import Pagination from './Pagination';

describe('<Pagination />', () => {
  it('should render with both hasPrevPage and hasNextPage', () => {
    const component = renderer.create(
      <Pagination
        hasPrevPage={true}
        hasNextPage={true}
        currentPage={2}
        lastPage={3}
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
        currentPage={2}
        lastPage={2}
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
        lastPage={2}
        nextClickHandler={() => {}}
        prevClickHandler={() => {}}
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call nextClickHandler prop when next button clicked', () => {
    const nextClickHandler = jest.fn();

    const component = renderer.create(
      <Pagination
        hasPrevPage={false}
        hasNextPage={true}
        currentPage={1}
        lastPage={2}
        nextClickHandler={nextClickHandler}
        prevClickHandler={() => {}}
      />
    );

    act(() => {
      component.root
        .findByProps({ buttonText: 'next' })
        .children[0].props.onClick();
    });

    expect(nextClickHandler.mock.calls.length).toBe(1);
  });

  it('should call prevClickHandler prop when previous button clicked', () => {
    const prevClickHandler = jest.fn();

    const component = renderer.create(
      <Pagination
        hasPrevPage={true}
        hasNextPage={false}
        currentPage={2}
        lastPage={2}
        nextClickHandler={() => {}}
        prevClickHandler={prevClickHandler}
      />
    );

    act(() => {
      component.root
        .findByProps({ buttonText: 'previous' })
        .children[0].props.onClick();
    });

    expect(prevClickHandler.mock.calls.length).toBe(1);
  });
});
