import React from 'react';

import Input from '../form/input/Input';
import Button from '../button/Button';

import classes from './ArmorShopItem.module.css';

const ArmorShopItem = (props) => {
  const armor = props.armor;
  return (
    <li className={classes.ArmorShopListItem}>
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
          <strong>Company</strong>: {armor.company.trim().split('_').join(' ')}
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
          onSubmit={(event) => props.addToCart(event, armor)}
          className={classes.ArmorShopListForm}
        >
          <Input
            elementType={armor.config.elementType}
            elementConfig={armor.config.elementConfig}
            classes={classes.ArmorShopListFormElement}
            value={armor.config.value}
            invalid={!armor.config.valid}
            touched={armor.config.touched}
            disabled={armor.stock < 1}
            hasValidation={armor.config.validation}
            changed={(event) =>
              props.inputChangedHandler(event.target.value, armor.id)
            }
          />

          <Button
            type="submit"
            classes={
              armor.stock > 0
                ? classes.ArmorShopAddToCartButton
                : [
                    classes.ArmorShopAddToCartButton,
                    classes.ArmorShopAddToCartButtonDisabled,
                  ]
            }
            disabled={!armor.config.valid}
            buttonText={armor.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          />
        </form>
      </div>
    </li>
  );
};

export default ArmorShopItem;
