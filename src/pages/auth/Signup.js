import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Auth from './Auth';
import Input from '../../components/form/input/Input';

class Signup extends Component {
  state = {
    loading: false,
    signupFormIsValid: true,
    signupForm: {
      userName: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          name: 'userName',
          placeholder: 'Your username here...',
          required: true
        },
        value: '',
        valid: false,
        validation: { required: true },
        touched: false
      },
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
    const updatedSignupForm = {
      ...this.state.signupForm
    };

    const updatedSignupDetail = { ...updatedSignupForm[identifier] };

    updatedSignupDetail.value = event.target.value;
    updatedSignupDetail.touched = true;

    if (updatedSignupDetail.validation) {
      updatedSignupDetail.valid = this.checkValidity(
        updatedSignupDetail.value,
        updatedSignupDetail.validation
      );
    }

    updatedSignupForm[identifier] = updatedSignupDetail;

    let formIsValid = true;

    for (let key in updatedSignupForm) {
      const isDetailValid = updatedSignupForm[key].valid;

      if (isDetailValid !== null && isDetailValid !== undefined) {
        formIsValid = isDetailValid && formIsValid;
      } else {
        formIsValid = true && formIsValid;
      }
    }

    this.setState({
      signupForm: updatedSignupForm,
      signupFormIsValid: formIsValid
    });
  }

  signup(event) {
    event.preventDefault();
  }

  render() {
    const signupFormElements = [];
    const signupForm = this.state.signupForm;

    for (let key in signupForm) {
      signupFormElements.push({
        id: key,
        config: signupForm[key]
      });
    }

    return (
      <Auth>
        <form onSubmit={event => this.signup(event)}>
          {signupFormElements.map(formElement => {
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
        </form>
      </Auth>
    );
  }
}

export default withRouter(Signup);
