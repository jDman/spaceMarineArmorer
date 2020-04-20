import React, { Fragment } from 'react';

import Button from '../button/Button';
import classes from './PreviousOrders.module.css';

const PreviousOrders = (props) => {
  const orderItemTypeClasses = {
    helmet: classes.PreviousOrdersListItemHelmet,
    body: classes.PreviousOrdersListItemBody,
    leg: classes.PreviousOrdersListItemLeg,
    arm: classes.PreviousOrdersListItemArm,
  };

  return (
    <div className={classes.PreviousOrders}>
      {!props.showPreviousOrders ? (
        <Button
          classes={classes.PreviousOrdersButton}
          clickHandler={() => props.showPreviousOrdersHandler(true)}
          buttonText="View previous orders"
        />
      ) : (
        <Button
          classes={classes.PreviousOrdersButton}
          clickHandler={() => props.showPreviousOrdersHandler(false)}
          buttonText="Hide previous orders"
        />
      )}

      {props.showPreviousOrders ? (
        <Fragment>
          {props.previousOrders.length ? (
            <Fragment>
              <h2 className={classes.PreviousOrdersHeading}>Previous orders</h2>
              <ul className={classes.PreviousOrders}>
                {props.previousOrders.map((order) => (
                  <div key={order._id}>
                    <div className={classes.PreviousOrdersListItemHeading}>
                      <h3>Order ID</h3>
                      <span>{order._id}</span>
                    </div>
                    {order.items.map((item) => (
                      <li
                        key={item.armor._id}
                        className={`${classes.PreviousOrdersListItem} ${
                          orderItemTypeClasses[item.armor.type]
                        }`}
                      >
                        <h4>{item.armor.name}</h4>
                        <p>Type {item.armor.type}</p>
                        <p>
                          Cost <small>{item.armor.cost}</small>
                        </p>
                      </li>
                    ))}
                  </div>
                ))}
              </ul>
            </Fragment>
          ) : (
            <h2>No orders found.</h2>
          )}
        </Fragment>
      ) : null}
    </div>
  );
};

export default PreviousOrders;
