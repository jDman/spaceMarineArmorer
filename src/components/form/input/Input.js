import React from 'react';

import classes from './Input.module.css';
import getClassOrClasses from '../../../utils/getClassOrClasses';

const Input = (props) => {
  let inputElement;
  let errorElement;

  let inputClasses = classes.InputElement;

  if (props.classes && props.classes.length) {
    const additionalClasses = getClassOrClasses(props.classes);

    inputClasses = `${inputClasses} ${additionalClasses}`;
  }

  if (props.invalid && props.hasValidation && props.touched) {
    inputClasses = `${inputClasses} ${classes.Invalid}`;
    errorElement = <p className={classes.Error}>Please enter a valid value!</p>;
  }

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses}
          {...props.elementConfig}
          disabled={props.disabled}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses}
          {...props.elementConfig}
          value={props.value}
          disabled={props.disabled}
          onChange={props.changed}
        ></textarea>
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={inputClasses}
          type={props.elementConfig.selectAttributes.type}
          name={props.elementConfig.selectAttributes.name}
          required={props.elementConfig.selectAttributes.required}
          disabled={props.disabled}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses}
          {...props.elementConfig}
          disabled={props.disabled}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      {props.hideLabel ? null : (
        <label className={classes.Label}>
          {props.elementConfig.name
            ? props.elementConfig.name
            : props.elementConfig.selectAttributes.name}
        </label>
      )}

      {inputElement}
      {errorElement}
    </div>
  );
};

export default Input;
