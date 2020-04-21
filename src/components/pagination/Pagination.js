import React, { useState } from 'react';

import Button from '../button/Button';
import Input from '../form/input/Input';

import classes from './Pagination.module.css';

const Pagination = (props) => {
  const [perPageConfig, setPerPageConfig] = useState({
    elementType: 'select',
    elementConfig: {
      selectAttributes: {
        type: 'select',
        name: 'quantity',
      },
      options: [
        { value: 10, displayValue: '10' },
        { value: 20, displayValue: '20' },
        { value: 50, displayValue: '50' },
      ],
    },
    value: '10',
    valid: true,
    touched: false,
  });

  const inputChangeHandler = (value) => {
    const updatedPerPageConfig = { ...perPageConfig, value };

    setPerPageConfig(updatedPerPageConfig);

    props.perPageHandler(value);
  };

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

      <div>
        Page {props.currentPage} of {props.lastPage} | Items per page{' '}
        <div className={classes.PaginationPerPageSelectWrapper}>
          <Input
            elementType={perPageConfig.elementType}
            elementConfig={perPageConfig.elementConfig}
            classes={classes.ArmorShopListFormElement}
            value={perPageConfig.value}
            invalid={!perPageConfig.valid}
            touched={perPageConfig.touched}
            hasValidation={perPageConfig.validation}
            hideLabel={true}
            changed={(event) => inputChangeHandler(event.target.value)}
          />
        </div>
      </div>

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
