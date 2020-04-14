import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import axios from 'axios';
import { withRouter, useHistory } from 'react-router-dom';

import './App.css';
import Header from './components/global/Header';
import Nav from './components/global/Nav';
import ArmorAdmin from './pages/admin/ArmorAdmin';
import ArmorShop from './pages/shop/ArmorShop';
import Cart from './pages/cart/Cart';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';

function App() {
  let history = useHistory();

  const [isAuth, setAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedToken, setGeneratedToken] = useState();

  const addToCartHandler = (event, armor) => {
    event.preventDefault();

    const armorId = armor.id;
    const quantity = armor.config.value;

    return axios
      .put('http://localhost:4000/shop/armor/cart', {
        armorId,
        quantity
      })
      .then(result => {
        console.log(result);
        return result;
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteCartItemHandler = itemId => {
    return axios
      .delete(`http://localhost:4000/shop/armor/cart/item`, {
        params: { itemId }
      })
      .then(result => result.message)
      .catch(err => console.log(err));
  };

  const loadingHandler = loadingValue => {
    setIsLoading(loadingValue);
  };

  const loginHandler = (event, { loading, loginFormIsValid, loginForm }) => {
    event.preventDefault();

    loadingHandler(true);

    axios
      .post('http://localhost:4000/auth/login', {
        email: loginForm.email.value,
        password: loginForm.password.value
      })
      .then(result => {
        const remainingMilliseconds = 60 * 60 * 1000;
        const token = result.data.token;

        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );

        sessionStorage.setItem('expiryDate', expiryDate.toISOString());
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('userId', result.data.userId);

        setAuth(true);
        setGeneratedToken(token);

        return;
      })
      .then(() => {
        history.replace('/shop');
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        loadingHandler(false);
      });
  };

  const logoutHandler = useCallback(() => {
    setAuth(false);

    sessionStorage.removeItem('expiryDate');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');

    history.replace('/login');
  }, [history]);

  const signupHandler = (event, { loading, signupFormIsValid, signupForm }) => {
    event.preventDefault();

    loadingHandler(true);

    axios
      .post('http://localhost:4000/auth/signup', {
        userName: signupForm.userName.value,
        email: signupForm.email.value,
        password: signupForm.password.value
      })
      .then(result => {
        history.replace('/login');
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        loadingHandler(false);
      });
  };

  const orderItemsHandler = items => {
    return axios
      .post(`http://localhost:4000/shop/armor/order`, {
        items
      })
      .then(result => result.message)
      .catch(err => console.log(err));
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const expiryDate = sessionStorage.getItem('expiryDate');
    const expired = new Date(expiryDate) <= new Date();

    if (expired) {
      logoutHandler();
      return;
    }

    setAuth(true);
    setGeneratedToken(token);
  }, [logoutHandler]);

  return (
    <Fragment>
      <div className="App">
        <Header />
        <Nav isAuth={isAuth} logout={logoutHandler} />
      </div>

      {isLoading ? <h1>Loading ...</h1> : null}

      <Switch>
        <Route path="/admin" render={props => <ArmorAdmin />}></Route>

        <Route
          path="/cart"
          render={props => {
            if (generatedToken) {
              return (
                <Cart
                  token={generatedToken}
                  deleteCartItem={deleteCartItemHandler}
                  orderItems={orderItemsHandler}
                />
              );
            }
          }}
        ></Route>

        <Route
          path="/shop"
          render={() => {
            if (generatedToken) {
              return (
                <ArmorShop
                  addToCart={addToCartHandler}
                  token={generatedToken}
                  loading={loadingHandler}
                  isLoading={isLoading}
                />
              );
            }
          }}
        ></Route>

        <Route
          path="/signup"
          render={props => <Signup signup={signupHandler} />}
        ></Route>

        <Route
          path="/login"
          render={props => <Login login={loginHandler} />}
        ></Route>

        <Route path="/">
          <p>Home</p>
        </Route>

        <Redirect to="/" />
      </Switch>
    </Fragment>
  );
}

export default withRouter(App);
