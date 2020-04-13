import React, { Fragment, useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import Input from '../../components/form/input/Input';

const ArmorShop = props => {
  const { token } = props;
  const [fetchedArmors, setFetchedArmors] = useState([]);
  const [totalArmor, setTotalArmor] = useState(0);

  const getArmors = useCallback(() => {
    return axios
      .get('http://localhost:4000/shop/armor')
      .then(result => {
        const armors = result.data.armor.map(armor => ({
          id: armor._id,
          type: armor.type,
          description: armor.description,
          company: armor.company,
          quality: armor.quality,
          protection: armor.protection,
          shield: armor.shield,
          discount: armor.discount,
          cost: armor.cost,
          createdBy: armor.createdBy.userName,
          config: {
            elementType: 'input',
            elementConfig: {
              type: 'number',
              name: 'quantity',
              min: 0,
              max: 99,
              step: 1
            },
            value: 0,
            valid: false,
            validation: {
              min: 1
            },
            touched: false
          }
        }));

        console.log(armors);

        setFetchedArmors(armors);
        setTotalArmor(result.data.totalItems);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const checkValidity = (value, rules) => {
    let isValid = true;

    const trimedValue = +value.trim();

    if (rules.min) {
      isValid = trimedValue > 0;
    }

    return isValid;
  };

  const inputChangedHandler = (event, armorId) => {
    event.preventDefault();

    const armors = [...fetchedArmors];

    const updatedArmorDetail = armors.find(armor => armorId === armor.id);

    updatedArmorDetail.config.value = event.target.value;
    updatedArmorDetail.config.touched = true;

    updatedArmorDetail.config.valid = checkValidity(
      updatedArmorDetail.config.value,
      updatedArmorDetail.config.validation
    );

    armors.map(armor => {
      if (armor.id === armorId) {
        return {
          ...updatedArmorDetail
        };
      }

      return armor;
    });

    setFetchedArmors(armors);
  };

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    getArmors();
  }, [getArmors, token]);

  return (
    <Fragment>
      <ul>
        {fetchedArmors.map(armor => (
          <li key={armor.id}>
            <p>Type: {armor.type}</p>
            <p>Description: {armor.description}</p>
            <p>
              Company:{' '}
              {armor.company
                .trim()
                .split('_')
                .join(' ')}
            </p>
            <p>Quality: {armor.quality}</p>
            <p>Protection: {armor.protection}</p>
            <p>Shield: {armor.shield}</p>
            <p>Discount: {armor.discount}</p>

            <p>Cost: {armor.cost}</p>

            <small>Created By: {armor.createdBy}</small>

            <form onSubmit={event => props.addToCart(event, armor)}>
              <Input
                elementType={'number'}
                elementConfig={armor.config.elementConfig}
                value={armor.config.value}
                invalid={!armor.config.valid}
                touched={armor.config.touched}
                hasValidation={armor.config.validation}
                changed={event => inputChangedHandler(event, armor.id)}
              />

              <button type="submit" disabled={!armor.config.valid}>
                Add to Cart
              </button>
            </form>
          </li>
        ))}
      </ul>

      <p>Total: {totalArmor}</p>
    </Fragment>
  );
};

export default ArmorShop;
