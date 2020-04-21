import React, { Fragment } from 'react';

import { NavLink } from 'react-router-dom';

import Button from '../../button/Button';
import classes from './Nav.module.css';

function Nav(props) {
  const activeLingStyles = {
    color: '#0900DB',
  };

  return (
    <nav>
      <ul className={classes.Navigation}>
        {props.isAuth ? (
          <li className={classes.NavigationListItem}>
            <NavLink
              to={'/'}
              className={classes.NavigationLink}
              exact
              strict
              activeStyle={activeLingStyles}
            >
              Home
            </NavLink>
          </li>
        ) : null}

        {!props.isAuth && (
          <Fragment>
            <li className={classes.NavigationListItem}>
              <NavLink
                to="/signup"
                className={classes.NavigationLink}
                exact
                strict
                activeStyle={activeLingStyles}
              >
                Signup
              </NavLink>
            </li>
            <li className={classes.NavigationListItem}>
              <NavLink
                to="/login"
                className={classes.NavigationLink}
                exact
                strict
                activeStyle={activeLingStyles}
              >
                Login
              </NavLink>
            </li>
          </Fragment>
        )}

        {props.isAuth && (
          <Fragment>
            {props.isAdmin ? (
              <li className={classes.NavigationListItem}>
                <NavLink
                  to="/admin"
                  className={classes.NavigationLink}
                  exact
                  strict
                  activeStyle={activeLingStyles}
                >
                  Admin
                </NavLink>
              </li>
            ) : null}

            <li className={classes.NavigationListItem}>
              <NavLink
                to="/shop"
                className={classes.NavigationLink}
                exact
                strict
                activeStyle={activeLingStyles}
              >
                Shop
              </NavLink>
            </li>

            <li className={classes.NavigationListItem}>
              <NavLink
                to="/cart"
                className={classes.NavigationLink}
                exact
                strict
                activeStyle={activeLingStyles}
              >
                Cart
              </NavLink>
            </li>

            <li className={classes.NavigationListItem}>
              <Button
                classes={classes.NavigationLogoutButton}
                clickHandler={() => props.logout()}
                buttonText="Logout"
              />
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
