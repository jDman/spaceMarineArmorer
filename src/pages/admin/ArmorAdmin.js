import React, { useState } from 'react';

import Input from '../../components/form/input/Input';
import Button from '../../components/button/Button';
import PageTitle from '../../components/page-title/PageTitle';

import maxLengthCheck from '../../utils/maxLengthCheck';
import minLengthCheck from '../../utils/minLengthCheck';
import maxNumberCheck from '../../utils/maxNumberCheck';
import minNumberCheck from '../../utils/minNumberCheck';
import requiredCheck from '../../utils/requiredCheck';

import useHttp from '../../hooks/http';

import classes from './ArmorAdmin.module.css';

const initialArmorAdminState = {
  armorDetailsFormIsValid: false,
  armorDetailsForm: {
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        name: 'name',
        required: true,
      },
      value: '',
      validators: [requiredCheck(null)],
      valid: false,
      touched: false,
    },
    type: {
      elementType: 'select',
      elementConfig: {
        selectAttributes: {
          type: 'select',
          name: 'type',
          required: true,
        },
        options: [
          { value: 'helmet', displayValue: 'Helmet' },
          { value: 'body', displayValue: 'Body' },
          { value: 'arm', displayValue: 'Arm' },
          { value: 'leg', displayValue: 'Leg' },
        ],
      },
      value: 'helmet',
      valid: true,
      validators: [],
      touched: false,
    },
    description: {
      elementType: 'textarea',
      elementConfig: {
        name: 'description',
        placeholder: 'This armor is...',
        required: true,
        minLength: 5,
        maxLength: 2000,
      },
      value: '',
      validators: [
        requiredCheck(null),
        minLengthCheck(5),
        maxLengthCheck(2000),
      ],
      valid: false,
      touched: false,
    },
    company: {
      elementType: 'select',
      elementConfig: {
        selectAttributes: {
          type: 'select',
          name: 'company',
          required: true,
        },
        options: [
          { value: 'starscape_systems', displayValue: 'Starscape Systems' },
          { value: 'adrax_corp', displayValue: 'Adrax Corp' },
          { value: 'orian_labs', displayValue: 'Orian Labs' },
        ],
      },
      value: 'starscape_systems',
      valid: true,
      validators: [],
      touched: false,
    },
    stock: {
      elementType: 'input',
      elementConfig: {
        type: 'number',
        name: 'stock',
        min: 0,
        max: 100,
        step: 1,
      },
      value: 0,
      valid: true,
      validators: [],
      touched: false,
    },
    discount: {
      elementType: 'input',
      elementConfig: {
        type: 'number',
        name: 'discount',
        min: 0,
        max: 100,
        step: 5,
      },
      value: 0,
      valid: true,
      validators: [],
      touched: false,
    },

    cost: {
      elementType: 'input',
      elementConfig: {
        type: 'number',
        name: 'cost',
        required: true,
        min: 0,
        max: 10000,
        step: 100,
      },
      value: 0,
      validators: [
        requiredCheck('0'),
        minNumberCheck(0),
        maxNumberCheck(10000),
      ],
      valid: false,
      touched: false,
    },
    shield: {
      elementType: 'input',
      elementConfig: {
        type: 'number',
        name: 'shield',
        min: 0,
        max: 100,
        step: 10,
      },
      value: 0,
      valid: true,
      validators: [],
      touched: false,
    },
    protection: {
      elementType: 'select',
      elementConfig: {
        selectAttributes: {
          type: 'select',
          name: 'protection',
          required: true,
        },
        options: [
          { value: 'high', displayValue: 'High' },
          { value: 'medium', displayValue: 'Medium' },
          { value: 'low', displayValue: 'Low' },
        ],
      },
      value: 'high',
      valid: true,
      validators: [],
      touched: false,
    },
    quality: {
      elementType: 'select',
      elementConfig: {
        selectAttributes: {
          type: 'select',
          name: 'quality',
          required: true,
        },
        options: [
          { value: 'high', displayValue: 'High' },
          { value: 'medium', displayValue: 'Medium' },
          { value: 'low', displayValue: 'Low' },
        ],
      },
      value: 'high',
      valid: true,
      validators: [],
      touched: false,
    },
  },
};

const ArmorAdmin = () => {
  const [armorDetails, setArmorDetails] = useState(initialArmorAdminState);
  const [isLoading, error, responseData, makeRequest] = useHttp();

  const addArmor = (event) => {
    event.preventDefault();

    const armorDetailsFormData = {};

    for (let key in armorDetails.armorDetailsForm) {
      armorDetailsFormData[key] = armorDetails.armorDetailsForm[key].value;
    }

    makeRequest('http://localhost:4000/admin/armor/add', 'POST', {
      ...armorDetailsFormData,
      createdBy: { userId: '5e70dfb438cee83fd9e004fd', userName: 'Freddy' },
    })
      .then((result) => {
        setArmorDetails(initialArmorAdminState);
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const inputChangedHandler = (value, identifier) => {
    setArmorDetails((prevState) => {
      let isValid = true;

      for (const validator of prevState.armorDetailsForm[identifier]
        .validators) {
        isValid = isValid && validator(value);
      }

      const updatedForm = {
        ...prevState.armorDetailsForm,
        [identifier]: {
          ...prevState.armorDetailsForm[identifier],
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
        armorDetailsForm: updatedForm,
        armorDetailsFormIsValid: formIsValid,
      };
    });
  };

  const armorDetailsFormElements = [];
  const armorDetailsForm = armorDetails.armorDetailsForm;

  for (let key in armorDetailsForm) {
    armorDetailsFormElements.push({
      id: key,
      config: armorDetailsForm[key],
    });
  }

  return (
    <section className={classes.ArmorAdmin}>
      <PageTitle title="Add an Armor" />

      <form onSubmit={(event) => addArmor(event)}>
        {armorDetailsFormElements.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            hasValidation={formElement.config.validators.length}
            changed={(event) =>
              inputChangedHandler(event.target.value, formElement.id)
            }
          />
        ))}
        <Button
          type="submit"
          classes={
            !armorDetails.armorDetailsFormIsValid
              ? [
                  classes.ArmorAdminAddArmorButton,
                  classes.ArmorAdminAddArmorButtonDisabled,
                ]
              : classes.ArmorAdminAddArmorButton
          }
          disabled={!armorDetails.armorDetailsFormIsValid}
          buttonText="Add Armor"
        />
      </form>
    </section>
  );
};

export default ArmorAdmin;
