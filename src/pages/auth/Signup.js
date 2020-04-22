import React, { Component } from 'react';

import Auth from './Auth';
import Input from '../../components/form/input/Input';
import Button from '../../components/button/Button';

import requiredCheck from '../../utils/requiredCheck';
import minLengthCheck from '../../utils/minLengthCheck';
import classes from './Signup.module.css';

class Signup extends Component {
  state = {
    loading: false,
    signupFormIsValid: false,
    signupForm: {
      userName: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          name: 'userName',
          placeholder: 'Your username here...',
          required: true,
        },
        value: '',
        valid: false,
        validators: [requiredCheck(null)],
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          name: 'email',
          placeholder: 'you@email.com',
          required: true,
        },
        value: '',
        valid: false,
        validators: [requiredCheck(null)],
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          name: 'password',
          placeholder: 'Enter you password...',
          required: true,
        },
        value: '',
        valid: false,
        validators: [requiredCheck(null)],
        touched: false,
      },
    },
  };

  inputChangedHandler(value, identifier) {
    this.setState((prevState) => {
      let isValid = true;

      for (const validator of prevState.signupForm[identifier].validators) {
        isValid = isValid && validator(value);
      }

      const updatedForm = {
        ...prevState.signupForm,
        [identifier]: {
          ...prevState.signupForm[identifier],
          touched: true,
          valid: isValid,
          value: value,
        },
      };

      let formIsValid = true;

      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }

      return {
        signupForm: updatedForm,
        signupFormIsValid: formIsValid,
      };
    });
  }

  checkValidity(value, rules) {
    let isValid = true;

    const trimedValue = value.trim();

    if (rules.required) {
      isValid = trimedValue !== '' && trimedValue !== '0' && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    return isValid;
  }

  render() {
    const signupFormElements = [];
    const signupForm = this.state.signupForm;

    for (let key in signupForm) {
      signupFormElements.push({
        id: key,
        config: signupForm[key],
      });
    }

    return (
      <Auth>
        <form onSubmit={(event) => this.props.signup(event, this.state)}>
          {signupFormElements.map((formElement) => {
            return (
              <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
                hasValidation={formElement.config.validators.length}
                changed={(event) =>
                  this.inputChangedHandler(event.target.value, formElement.id)
                }
              />
            );
          })}
          <Button
            type="submit"
            classes={
              !this.state.signupFormIsValid
                ? [classes.SignupFormButton, classes.SignupFormButtonDisabled]
                : classes.SignupFormButton
            }
            buttonText="Signup"
            disabled={!this.state.signupFormIsValid}
          />
        </form>
      </Auth>
    );
  }
}

export default Signup;
