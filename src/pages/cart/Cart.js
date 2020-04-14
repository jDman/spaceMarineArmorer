import React, { Fragment, useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import Input from '../../components/form/input/Input';

const Cart = (props) => {
  const token = props.token;
  const [usersCartItems, setUsersCartItems] = useState([]);
  const [usersCartItemsNumber, setUsersCartItemsNumber] = useState(0);

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

        setUsersCartItems(inputConfigCartItems);
        setUsersCartItemsNumber(inputConfigCartItems.length);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteCartItem = (itemId) => {
    props
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

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios.defaults.headers.common['Content-Type'] = 'application/json';

    getCart();
  }, [getCart, token]);

  return (
    <Fragment>
      <ul>
        {usersCartItems.map((item) => (
          <li key={item.armor._id}>
            <h3>
              {item.type} <span>Total price: {item.totalCost}</span>
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
              <button type="button" onClick={() => deleteCartItem(item.itemId)}>
                Delete
              </button>
            </h3>
          </li>
        ))}
      </ul>

      <p>Items in cart: {usersCartItemsNumber}</p>

      <button onClick={() => props.orderItems(usersCartItems)}>
        Order Item(s)
      </button>
    </Fragment>
  );
};

export default Cart;
