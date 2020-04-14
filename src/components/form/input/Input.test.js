import React from 'react';
import renderer from 'react-test-renderer';
import Input from './Input';

describe('<Input />', () => {
  it('renders Input component with props passed in for elementType input text', () => {
    const config = {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        name: 'testText',
        placeholder: 'This test is...',
        required: true
      },
      value: '',
      valid: false,
      touched: false,
      validation: { required: true }
    };
    const component = renderer.create(
      <Input
        elementType={config.elementType}
        elementConfig={config.elementConfig}
        value={config.value}
        invalid={!config.valid}
        touched={config.touched}
        hasValidation={config.validation}
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Input component with props passed in for elementType input number', () => {
    const config = {
      elementType: 'input',
      elementConfig: {
        type: 'number',
        name: 'testNumber',
        required: true,
        min: 0,
        max: 10000,
        step: 100
      },
      value: 0,
      valid: false,
      touched: false,
      validation: { required: true }
    };
    const component = renderer.create(
      <Input
        elementType={config.elementType}
        elementConfig={config.elementConfig}
        value={config.value}
        invalid={!config.valid}
        touched={config.touched}
        hasValidation={config.validation}
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Input component with props passed in for elementType textarea', () => {
    const config = {
      elementType: 'textarea',
      elementConfig: {
        name: 'testTextarea',
        placeholder: 'This test is...',
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
      value: '',
      valid: false,
      touched: false
    };
    const component = renderer.create(
      <Input
        elementType={config.elementType}
        elementConfig={config.elementConfig}
        value={config.value}
        invalid={!config.valid}
        touched={config.touched}
        hasValidation={config.validation}
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Input component with props passed in for elementType select', () => {
    const config = {
      elementType: 'select',
      elementConfig: {
        selectAttributes: {
          type: 'select',
          name: 'testSelect',
          required: true
        },
        options: [
          { value: 'test1', displayValue: 'Test 1' },
          { value: 'test2', displayValue: 'Test 2' },
          { value: 'test3', displayValue: 'Test 3' }
        ]
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    };
    const component = renderer.create(
      <Input
        elementType={config.elementType}
        elementConfig={config.elementConfig}
        value={config.value}
        invalid={!config.valid}
        touched={config.touched}
        hasValidation={config.validation}
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
