import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import PageTitle from '../../components/page-title/PageTitle';
import ArmorShopItem from '../../components/armor-shop-item/ArmorShopItem';
import classes from './ArmorShop.module.css';

const ArmorShop = (props) => {
  const { token } = props;
  const [fetchedArmors, setFetchedArmors] = useState([]);

  const addToCart = async (event, armor) => {
    await props
      .addToCart(event, armor)
      .then((result) => {
        getArmors();
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
          stock: armor.stock,
          createdBy: armor.createdBy.userName,
          config: {
            elementType: 'input',
            elementConfig: {
              type: 'number',
              name: 'quantity',
              min: 0,
              max: +armor.stock,
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
      <PageTitle title="Shop for Armor" />

      <ul className={classes.ArmorShopList}>
        {fetchedArmors.map((armor) => (
          <ArmorShopItem
            key={armor.id}
            armor={armor}
            inputChangedHandler={inputChangedHandler}
            addToCart={addToCart}
          />
        ))}
      </ul>
    </section>
  );
};

export default ArmorShop;
