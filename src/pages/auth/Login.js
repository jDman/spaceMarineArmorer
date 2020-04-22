import React, { Component } from 'react';

import Auth from './Auth';
import Input from '../../components/form/input/Input';
import Button from '../../components/button/Button';

import emailCheck from '../../utils/emailCheck';
import requiredCheck from '../../utils/requiredCheck';
import minLengthCheck from '../../utils/minLengthCheck';

import classes from './Login.module.css';

class Login extends Component {
  state = {
    loading: false,
    loginFormIsValid: false,
    loginForm: {
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
        validators: [emailCheck, requiredCheck(null)],
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
        validators: [requiredCheck(null), minLengthCheck(8)],
        touched: false,
      },
    },
  };

  inputChangedHandler(value, identifier) {
    this.setState((prevState) => {
      let isValid = true;

      for (const validator of prevState.loginForm[identifier].validators) {
        isValid = isValid && validator(value);
      }

      const updatedForm = {
        ...prevState.loginForm,
        [identifier]: {
          ...prevState.loginForm[identifier],
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
        loginForm: updatedForm,
        loginFormIsValid: formIsValid,
      };
    });
  }

  render() {
    const loginFormElements = [];
    const loginForm = this.state.loginForm;

    for (let key in loginForm) {
      loginFormElements.push({
        id: key,
        config: loginForm[key],
      });
    }

    return (
      <Auth>
        <form onSubmit={(event) => this.props.login(event, this.state)}>
          {loginFormElements.map((formElement) => {
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
            buttonText="Login"
            classes={
              !this.state.loginFormIsValid
                ? [classes.LoginFormButton, classes.LoginFormButtonDisabled]
                : classes.LoginFormButton
            }
            disabled={!this.state.loginFormIsValid}
          />
        </form>
      </Auth>
    );
  }
}

export default Login;
