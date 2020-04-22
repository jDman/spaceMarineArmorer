import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import PageTitle from '../../components/page-title/PageTitle';
import ArmorShopItem from '../../components/armor-shop-item/ArmorShopItem';

import minNumberCheck from '../../utils/minNumberCheck';

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
            validators: [minNumberCheck(1)],
            touched: false,
          },
        }));

        setFetchedArmors(armors);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const inputChangedHandler = (value, armorId) => {
    let isValid = true;

    const updatedArmors = [...fetchedArmors];

    const armorIndex = updatedArmors.findIndex((armor) => armor.id === armorId);

    for (const validator of updatedArmors[armorIndex].config.validators) {
      isValid = isValid && validator(value);
    }

    const oldConfig = updatedArmors[armorIndex].config;

    const updatedArmorConfig = {
      ...oldConfig,
      touched: true,
      valid: isValid,
      value: value,
    };

    const updatedArmor = {
      ...updatedArmors[armorIndex],
      config: updatedArmorConfig,
    };

    updatedArmors[armorIndex] = updatedArmor;

    setFetchedArmors(updatedArmors);
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
