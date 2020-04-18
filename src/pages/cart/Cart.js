import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import Button from '../../components/button/Button';
import Input from '../../components/form/input/Input';

import classes from './Cart.module.css';

const Cart = (props) => {
  const token = props.token;
  const [usersCartItems, setUsersCartItems] = useState([]);
  const [usersCartItemsNumber, setUsersCartItemsNumber] = useState(0);
  const [canOrder, setCanOrder] = useState(false);

  const getCart = useCallback(() => {
    return axios
      .get('http://localhost:4000/shop/armor/cart/items')
      .then((result) => {
        const inputConfigCartItems = result.data.items.map((item) => {
          return {
            armor: item.armor,
            itemId: item._id,
            type: item.armor.type,
            cost: item.armor.cost,
            totalCost: item.armor.cost * item.quantity,
            config: {
              elementType: 'input',
              elementConfig: {
                type: 'number',
                name: 'quantity',
                min: 0,
                max: 99,
                step: 1,
              },
              value: item.quantity,
              valid: true,
              touched: false,
            },
          };
        });

        const inputConfigCartItemsLength = inputConfigCartItems.length;

        setUsersCartItems(inputConfigCartItems);
        setUsersCartItemsNumber(inputConfigCartItemsLength);

        inputConfigCartItemsLength ? setCanOrder(true) : setCanOrder(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteCartItem = async (itemId) => {
    await props
      .deleteCartItem(itemId)
      .then(() => {
        getCart();
      })
      .catch((err) => console.error(err));
  };

  const inputChangedHandler = (newQuantity, itemId) => {
    const updatedUsersCartItems = [...usersCartItems].map((item) => {
      if (item.id === itemId) {
        item.config.value = newQuantity;
      }

      return item;
    });

    setUsersCartItems(updatedUsersCartItems);
  };

  const orderItems = async (items) => {
    await props
      .orderItems(items)
      .then((result) => {
        getCart();
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios.defaults.headers.common['Content-Type'] = 'application/json';

    getCart();
  }, [getCart, token]);

  return (
    <section className={classes.Cart}>
      <ul className={classes.CartItemList}>
        {usersCartItems.map((item) => (
          <li key={item.armor._id} className={classes.CartItem}>
            <div>
              <h3 className={classes.CartItemDetail}>{item.type} Armor Type</h3>
              <p className={classes.CartItemDetail}>
                Total price: {item.totalCost}
              </p>
              <Input
                elementType={'number'}
                elementConfig={item.config.elementConfig}
                value={item.config.value}
                invalid={!item.config.valid}
                touched={item.config.touched}
                hasValidation={item.config.validation}
                changed={(event) =>
                  inputChangedHandler(event.target.value, item.armor._id)
                }
              />
              <Button
                buttonText="Delete"
                classes={classes.CartItemDeleteButton}
                clickHandler={() => deleteCartItem(item.itemId)}
              />
            </div>
          </li>
        ))}
      </ul>

      <p className={classes.CartItemsInCounter}>
        Items in cart: {usersCartItemsNumber}
      </p>

      <Button
        buttonText="Order Item(s)"
        classes={
          !canOrder
            ? [classes.CartOrderButton, classes.CartOrderButtonDisabled]
            : classes.CartOrderButton
        }
        clickHandler={() => orderItems(usersCartItems)}
        disabled={!canOrder}
      />
    </section>
  );
};

export default Cart;
