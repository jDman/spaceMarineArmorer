import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import axios from 'axios';
import { withRouter, useHistory } from 'react-router-dom';

import Header from './components/global/header/Header';
import Nav from './components/global/nav/Nav';
import ArmorAdmin from './pages/admin/ArmorAdmin';
import ArmorShop from './pages/shop/ArmorShop';
import Cart from './pages/cart/Cart';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import PreviousOrders from './components/previous-orders/PreviousOrders';
import Pagination from './components/pagination/Pagination';
import PageTitle from './components/page-title/PageTitle';

import classes from './App.module.css';

function App() {
  let history = useHistory();

  const [isAuth, setAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previousOrders, setPreviousOrders] = useState([]);
  const [hasNextOrdersPage, setHasNextOrdersPage] = useState(false);
  const [hasPreviousOrdersPage, setHasPreviousOrdersPage] = useState(false);
  const [lastOrdersPage, setLastOrdersPage] = useState(false);
  const [totalOrders, setTotalOrders] = useState(0);
  const [generatedToken, setGeneratedToken] = useState();
  const [showPreviousOrders, setShowPreviousOrders] = useState(false);
  const [currentOrdersPage, setCurrentOrdersPage] = useState(1);
  const [chosenOrdersPerPage, setChosenOrdersPerPage] = useState(10);
  const [userIsAdmin, setUserIsAdmin] = useState(false);

  const getPreviousOrders = (params) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + generatedToken;
    axios.defaults.headers.common['Content-Type'] = 'application/json';

    return axios
      .get('http://localhost:4000/shop/orders', { params })
      .then((result) => {
        const {
          orders,
          hasPrevPage,
          hasNextPage,
          lastPage,
          totalItems,
        } = result.data;

        setPreviousOrders(orders);
        setHasPreviousOrdersPage(hasPrevPage);
        setHasNextOrdersPage(hasNextPage);
        setLastOrdersPage(lastPage);
        setTotalOrders(totalItems);

        return;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showPreviousOrdersHandler = (shouldShow) => {
    setShowPreviousOrders(shouldShow);

    if (shouldShow && !previousOrders.length) {
      getPreviousOrders({
        page: currentOrdersPage,
        perPage: chosenOrdersPerPage,
      });
    }
  };

  const getPreviousOrdersHandler = (page) => {
    const previousPage = page - 1;

    if (!hasPreviousOrdersPage) {
      return;
    }

    setCurrentOrdersPage(previousPage);

    getPreviousOrders({
      page: previousPage,
      perPage: chosenOrdersPerPage,
    });
  };

  const getNextOrdersHandler = (page) => {
    const nextPage = page + 1;

    if (!hasNextOrdersPage) {
      return;
    }

    setCurrentOrdersPage(nextPage);

    getPreviousOrders({
      page: nextPage,
      perPage: chosenOrdersPerPage,
    });
  };

  const addToCartHandler = (event, armor) => {
    event.preventDefault();

    const armorId = armor.id;
    const quantity = armor.config.value;

    return axios
      .put('http://localhost:4000/shop/armor/cart', {
        armorId,
        quantity,
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCartItemHandler = (itemId) => {
    return axios
      .delete(`http://localhost:4000/shop/armor/cart/item`, {
        params: { itemId },
      })
      .then((result) => result.message)
      .catch((err) => console.log(err));
  };

  const loadingHandler = (loadingValue) => {
    setIsLoading(loadingValue);
  };

  const loginHandler = (event, { loading, loginFormIsValid, loginForm }) => {
    event.preventDefault();

    setIsLoading(true);

    axios
      .post('http://localhost:4000/auth/login', {
        email: loginForm.email.value,
        password: loginForm.password.value,
      })
      .then((result) => {
        const remainingMilliseconds = 60 * 60 * 1000;
        const { token, isAdmin } = result.data;

        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );

        sessionStorage.setItem('expiryDate', expiryDate.toISOString());
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('userId', result.data.userId);

        setAuth(true);
        setUserIsAdmin(isAdmin);
        setGeneratedToken(token);

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
      })
      .then(() => {
        history.replace('/');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
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
        password: signupForm.password.value,
      })
      .then((result) => {
        history.replace('/login');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        loadingHandler(false);
      });
  };

  const orderItemsHandler = (items) => {
    return axios
      .post(`http://localhost:4000/shop/armor/order`, {
        items,
      })
      .then((result) => {
        getPreviousOrders({
          page: currentOrdersPage,
          perPage: chosenOrdersPerPage,
        });
      })
      .catch((err) => console.log(err));
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

  const orderItemsPerPageHandler = (itemNumber) => {
    setCurrentOrdersPage(1);
    setChosenOrdersPerPage(itemNumber);

    getPreviousOrders({ page: 1, perPage: itemNumber });
  };

  return (
    <Fragment>
      <div className={classes.App}>
        <Header />
        <Nav isAuth={isAuth} isAdmin={userIsAdmin} logout={logoutHandler} />
      </div>

      {isLoading ? <h1>Loading ...</h1> : null}

      <Switch>
        {userIsAdmin ? (
          <Route
            path="/admin"
            exact
            strict
            render={(props) => <ArmorAdmin />}
          ></Route>
        ) : null}

        <Route
          path="/cart"
          exact
          strict
          render={(props) => {
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
          exact
          strict
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
          exact
          strict
          render={(props) => <Signup signup={signupHandler} />}
        ></Route>

        <Route
          path="/login"
          exact
          strict
          render={(props) => <Login login={loginHandler} />}
        ></Route>

        {isAuth ? (
          <Route
            path="/"
            exact
            strict
            render={() => {
              return (
                <section className={classes.AppHomeSection}>
                  <PageTitle title="Welome to your friendly Space Marine Armory" />

                  <Fragment>
                    <PreviousOrders
                      showPreviousOrdersHandler={showPreviousOrdersHandler}
                      showPreviousOrders={showPreviousOrders}
                      previousOrders={previousOrders}
                      total={totalOrders}
                    />
                    {showPreviousOrders ? (
                      <Pagination
                        prevClickHandler={getPreviousOrdersHandler}
                        currentPage={currentOrdersPage}
                        lastPage={lastOrdersPage}
                        nextClickHandler={getNextOrdersHandler}
                        hasPrevPage={hasPreviousOrdersPage}
                        hasNextPage={hasNextOrdersPage}
                        perPageHandler={orderItemsPerPageHandler}
                      />
                    ) : null}
                  </Fragment>
                </section>
              );
            }}
          />
        ) : null}

        <Redirect to="/" exact strict />
      </Switch>
    </Fragment>
  );
}

export default withRouter(App);
