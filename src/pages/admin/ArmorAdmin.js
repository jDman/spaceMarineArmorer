import React, { Component } from 'react';
import axios from 'axios';

import Input from '../../components/form/input/Input';

class ArmorAdmin extends Component {
  state = {
    loading: false,
    armorDetailsFormIsValid: false,
    armorDetailsForm: {
      shield: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          name: 'shield',
          min: 0,
          max: 100,
          step: 10
        },
        value: 0,
        valid: true,
        validation: {},
        touched: false
      },
      stock: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          name: 'stock',
          min: 0,
          max: 100,
          step: 1
        },
        value: 0,
        valid: true,
        validation: {},
        touched: false
      },
      discount: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          name: 'discount',
          min: 0,
          max: 100,
          step: 5
        },
        value: 0,
        valid: true,
        validation: {},
        touched: false
      },
      type: {
        elementType: 'select',
        elementConfig: {
          selectAttributes: {
            type: 'select',
            name: 'protection',
            required: true
          },
          options: [
            { value: 'helmet', displayValue: 'Helmet' },
            { value: 'body', displayValue: 'Body' },
            { value: 'arm', displayValue: 'Arm' },
            { value: 'leg', displayValue: 'Leg' }
          ]
        },
        value: '',
        valid: false,
        validation: { required: true },
        touched: false
      },
      cost: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          name: 'cost',
          required: true,
          min: 0,
          max: 10000,
          step: 100
        },
        value: 0,
        validation: {
          required: true,
          min: 0,
          max: 10000
        },
        valid: false,
        touched: false
      },
      protection: {
        elementType: 'select',
        elementConfig: {
          selectAttributes: {
            type: 'select',
            name: 'protection',
            required: true
          },
          options: [
            { value: 'high', displayValue: 'High' },
            { value: 'medium', displayValue: 'Medium' },
            { value: 'low', displayValue: 'Low' }
          ]
        },
        value: '',
        valid: false,
        validation: { required: true },
        touched: false
      },
      quality: {
        elementType: 'select',
        elementConfig: {
          selectAttributes: {
            type: 'select',
            name: 'quality',
            required: true
          },
          options: [
            { value: 'high', displayValue: 'High' },
            { value: 'medium', displayValue: 'Medium' },
            { value: 'low', displayValue: 'Low' }
          ]
        },
        value: '',
        valid: false,
        validation: { required: true },
        touched: false
      },
      description: {
        elementType: 'textarea',
        elementConfig: {
          name: 'description',
          placeholder: 'This armor is...',
          required: true,
          minLength: 5,
          maxLength: 2000
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 2000
        },
        valid: false,
        touched: false
      },
      company: {
        elementType: 'select',
        elementConfig: {
          selectAttributes: {
            type: 'select',
            name: 'company',
            required: true
          },
          options: [
            { value: 'starscape_systems', displayValue: 'Starscape Systems' },
            { value: 'adrax_corp', displayValue: 'Adrax Corp' },
            { value: 'orian_labs', displayValue: 'Orian Labs' }
          ]
        },
        value: '',
        valid: false,
        validation: { required: true },
        touched: false
      }
    }
  };

  // goHome() {
  //   this.props.history.push('/');
  // }

  addArmor(event) {
    event.preventDefault();

    this.setState({ loading: true });

    const armorDetailsFormData = {};

    for (let key in this.state.armorDetailsForm) {
      armorDetailsFormData[key] = this.state.armorDetailsForm[key].value;
    }

    axios
      .post('http://localhost:4000/admin/armor/add', {
        ...armorDetailsFormData,
        createdBy: { userId: '5e70dfb438cee83fd9e004fd', userName: 'Freddy' }
      })
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
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

  inputChangedHandler(event, identifier) {
    const updatedArmorDetailsForm = {
      ...this.state.armorDetailsForm
    };

    const updatedArmorDetail = { ...updatedArmorDetailsForm[identifier] };

    updatedArmorDetail.value = event.target.value;
    updatedArmorDetail.touched = true;

    if (updatedArmorDetail.validation) {
      updatedArmorDetail.valid = this.checkValidity(
        updatedArmorDetail.value,
        updatedArmorDetail.validation
      );
    }

    updatedArmorDetailsForm[identifier] = updatedArmorDetail;

    let formIsValid = true;

    for (let key in updatedArmorDetailsForm) {
      const isDetailValid = updatedArmorDetailsForm[key].valid;

      if (isDetailValid !== null && isDetailValid !== undefined) {
        formIsValid = isDetailValid && formIsValid;
      } else {
        formIsValid = true && formIsValid;
      }
    }

    this.setState({
      armorDetailsForm: updatedArmorDetailsForm,
      armorDetailsFormIsValid: formIsValid
    });
  }

  render() {
    const armorDetailsFormElements = [];
    const armorDetailsForm = this.state.armorDetailsForm;

    for (let key in armorDetailsForm) {
      armorDetailsFormElements.push({
        id: key,
        config: armorDetailsForm[key]
      });
    }

    return (
      <section>
        {/* <button type="button" onClick={this.goHome.bind(this)}>
          Home
        </button> */}

        <form onSubmit={event => this.addArmor(event)}>
          {armorDetailsFormElements.map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              touched={formElement.config.touched}
              hasValidation={formElement.config.validation}
              changed={event => this.inputChangedHandler(event, formElement.id)}
            />
          ))}

          <button type="submit" disabled={!this.state.armorDetailsFormIsValid}>
            Add
          </button>
        </form>
      </section>
    );
  }
}

export default ArmorAdmin;
