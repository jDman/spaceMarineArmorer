import React, { Component } from 'react';

import Auth from './Auth';
import Input from '../../components/form/input/Input';

class Login extends Component {
  state = {
    loading: false,
    loginFormIsValid: true,
    loginForm: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          name: 'email',
          placeholder: 'you@email.com',
          required: true
        },
        value: '',
        valid: false,
        validation: { required: true },
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          name: 'password',
          placeholder: 'Enter you password...',
          required: true
        },
        value: '',
        valid: false,
        validation: { required: true },
        touched: false
      }
    }
  };

  inputChangedHandler(event, identifier) {
    const updatedLoginForm = {
      ...this.state.loginForm
    };

    const updatedLoginDetail = { ...updatedLoginForm[identifier] };

    updatedLoginDetail.value = event.target.value;
    updatedLoginDetail.touched = true;

    if (updatedLoginDetail.validation) {
      updatedLoginDetail.valid = this.checkValidity(
        updatedLoginDetail.value,
        updatedLoginDetail.validation
      );
    }

    updatedLoginForm[identifier] = updatedLoginDetail;

    let formIsValid = true;

    for (let key in updatedLoginForm) {
      const isDetailValid = updatedLoginForm[key].valid;

      if (isDetailValid !== null && isDetailValid !== undefined) {
        formIsValid = isDetailValid && formIsValid;
      } else {
        formIsValid = true && formIsValid;
      }
    }

    this.setState({
      loginForm: updatedLoginForm,
      loginFormIsValid: formIsValid
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
    const loginFormElements = [];
    const loginForm = this.state.loginForm;

    for (let key in loginForm) {
      loginFormElements.push({
        id: key,
        config: loginForm[key]
      });
    }

    return (
      <Auth>
        <form onSubmit={event => this.props.login(event, this.state)}>
          {loginFormElements.map(formElement => {
            return (
              <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
                hasValidation={formElement.config.validation}
                changed={event =>
                  this.inputChangedHandler(event, formElement.id)
                }
              />
            );
          })}

          <button type="submit">Login</button>
        </form>
      </Auth>
    );
  }
}

export default Login;
