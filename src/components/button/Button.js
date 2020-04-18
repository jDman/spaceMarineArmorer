import React, { Fragment } from 'react';

const Button = (props) => {
  const type = props.type || 'button';

  const classString = Array.isArray(props.classes)
    ? props.classes.join(' ')
    : typeof props.classes === 'string'
    ? props.classes
    : '';

  return (
    <Fragment>
      <button
        type={type}
        className={classString}
        disabled={props.disabled || props.loading}
        onClick={(event) =>
          props.clickHandler ? props.clickHandler(event) : () => {}
        }
      >
        {props.buttonText}
      </button>
    </Fragment>
  );
};

export default Button;
