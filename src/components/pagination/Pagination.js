import React from 'react';

import Button from '../button/Button';

import classes from './Pagination.module.css';

const Pagination = (props) => {
  return (
    <div className={classes.Pagination}>
      {props.hasPrevPage ? (
        <Button
          buttonText="previous"
          classes={classes.PaginationButton}
          clickHandler={() => props.prevClickHandler(props.currentPage)}
        />
      ) : null}
      <p>Page {props.currentPage}</p>
      {props.hasNextPage ? (
        <Button
          buttonText="next"
          classes={classes.PaginationButton}
          clickHandler={() => props.nextClickHandler(props.currentPage)}
        />
      ) : null}
    </div>
  );
};

export default Pagination;
