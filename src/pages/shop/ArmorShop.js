import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import Input from '../../components/form/input/Input';
import Button from '../../components/button/Button';

import classes from './ArmorShop.module.css';

const ArmorShop = (props) => {
  const { token } = props;
  const [fetchedArmors, setFetchedArmors] = useState([]);

  const addToCart = async (event, armor) => {
    await props
      .addToCart(event, armor)
      .then((result) => {
        const updatedFetchedArmors = [...fetchedArmors].map((armor) => {
          armor.config.value = 0;

          return armor;
        });

        setFetchedArmors(updatedFetchedArmors);
      })
      .catch((err) => console.log(err));
  };

  const getArmors = useCallback(() => {
    return axios
      .get('http://localhost:4000/shop/armors')
      .then((result) => {
        const armors = result.data.armors.map((armor) => ({
          id: armor._id,
          name: armor.name,
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
              step: 1,
            },
            value: 0,
            valid: false,
            validation: {
              min: 1,
            },
            touched: false,
          },
        }));

        setFetchedArmors(armors);
      })
      .catch((err) => {
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

  const inputChangedHandler = (newQuantity, armorId) => {
    const armors = [...fetchedArmors];

    const updatedArmorDetail = armors.find((armor) => armorId === armor.id);

    updatedArmorDetail.config.value = newQuantity;
    updatedArmorDetail.config.touched = true;

    updatedArmorDetail.config.valid = checkValidity(
      updatedArmorDetail.config.value,
      updatedArmorDetail.config.validation
    );

    armors.map((armor) => {
      if (armor.id === armorId) {
        return {
          ...updatedArmorDetail,
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
    <section className={classes.ArmorShop}>
      <ul className={classes.ArmorShopList}>
        {fetchedArmors.map((armor) => (
          <li key={armor.id} className={classes.ArmorShopListItem}>
            <div className={classes.ArmorShopListItemContainer}>
              <p>
                <strong>Name</strong>: {armor.name}
              </p>
              <p>
                <strong>Type</strong>: {armor.type}
              </p>
              <p>
                <strong>Description</strong>: {armor.description}
              </p>
              <p>
                <strong>Company</strong>:{' '}
                {armor.company.trim().split('_').join(' ')}
              </p>
              <p>
                <strong>Quality</strong>: {armor.quality}
              </p>
              <p>
                <strong>Protection</strong>: {armor.protection}
              </p>
              <p>
                <strong>Shield</strong>: {armor.shield}
              </p>
              <p>
                <strong>Discount</strong>: {armor.discount}
              </p>

              <p>
                <strong>Cost</strong>: {armor.cost}
              </p>

              <small>Created By: {armor.createdBy}</small>
            </div>

            <div className={classes.ArmorShopListItemContainer}>
              <form
                onSubmit={(event) => addToCart(event, armor)}
                className={classes.ArmorShopListForm}
              >
                <Input
                  elementType={'number'}
                  elementConfig={armor.config.elementConfig}
                  value={armor.config.value}
                  invalid={!armor.config.valid}
                  touched={armor.config.touched}
                  hasValidation={armor.config.validation}
                  changed={(event) =>
                    inputChangedHandler(event.target.value, armor.id)
                  }
                />

                <Button
                  type="submit"
                  classes={[classes.ArmorShopAddToCartButton]}
                  disabled={!armor.config.valid}
                  buttonText="Add to Cart"
                  clickHandler={() => {}}
                />
              </form>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ArmorShop;
