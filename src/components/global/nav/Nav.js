import React, { Fragment } from 'react';

import { NavLink } from 'react-router-dom';

function Nav(props) {
  return (
    <nav>
      <ul className="navigation">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>

        {!props.isAuth && (
          <Fragment>
            <li>
              <NavLink to="/signup">Signup</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </Fragment>
        )}

        {props.isAuth && (
          <Fragment>
            <li>
              <NavLink to="/admin">Admin</NavLink>
            </li>

            <li>
              <NavLink to="/shop">Shop</NavLink>
            </li>

            <li>
              <NavLink to="/cart">Cart</NavLink>
            </li>

            <li>
              <button onClick={() => props.logout()}>Logout</button>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
