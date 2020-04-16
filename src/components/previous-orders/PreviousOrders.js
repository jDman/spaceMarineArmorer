import React, { Fragment } from 'react';

const PreviousOrders = (props) => {
  return (
    <Fragment>
      <ul>
        {props.previousOrders.map((order) => (
          <div key={order._id}>
            <h2>Previous orders</h2>
            <h3>Order ID: {order._id}</h3>

            {order.items.map((item) => (
              <li key={item.armor._id}>
                <h4>{item.armor.type}</h4>
              </li>
            ))}
          </div>
        ))}
      </ul>
    </Fragment>
  );
};

export default PreviousOrders;
