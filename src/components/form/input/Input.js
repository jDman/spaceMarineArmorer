import React from 'react';

import classes from './Input.module.css';

const Input = props => {
  let inputElement;
  let errorElement;

  const inputClasses = [classes.InputElement];

  if (props.invalid && props.hasValidation && props.touched) {
    inputClasses.push(classes.Invalid);
    errorElement = <p className={classes.Error}>Please enter a valid value!</p>;
  }

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        ></textarea>
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          type={props.elementConfig.selectAttributes.type}
          name={props.elementConfig.selectAttributes.name}
          required={props.elementConfig.selectAttributes.required}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => (
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
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {errorElement}
    </div>
  );
};

export default Input;
