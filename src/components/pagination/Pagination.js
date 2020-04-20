import React from 'react';

import Button from '../button/Button';

import classes from './Pagination.module.css';

const Pagination = (props) => {
  return (
    <div className={classes.Pagination}>
      <div className={classes.PaginationButtonContainer}>
        {props.hasPrevPage ? (
          <Button
            buttonText="previous"
            classes={classes.PaginationButton}
            clickHandler={() => props.prevClickHandler(props.currentPage)}
          />
        ) : null}
      </div>

      <p>
        Page {props.currentPage} of {props.lastPage} | Items per page{' '}
        <select onChange={(event) => props.perPageHandler(event.target.value)}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </p>

      <div className={classes.PaginationButtonContainer}>
        {props.hasNextPage ? (
          <Button
            buttonText="next"
            classes={classes.PaginationButton}
            clickHandler={() => props.nextClickHandler(props.currentPage)}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Pagination;
