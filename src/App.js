import React, { Component, Fragment, useState } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import axios from 'axios';
import { withRouter, useHistory } from 'react-router-dom';

import './App.css';
import Header from './components/global/Header';
import Nav from './components/global/Nav';
import ArmorAdmin from './pages/admin/ArmorAdmin';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';

function App() {
  let history = useHistory();

  const [isAuth, setAuth] = useState(false);

  const loginHandler = (event, { loading, loginFormIsValid, loginForm }) => {
    event.preventDefault();

    axios
      .post('http://localhost:4000/auth/login', {
        email: loginForm.email.value,
        password: loginForm.password.value
      })
      .then(result => {
        const remainingMilliseconds = 60 * 60 * 1000;

        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );

        sessionStorage.setItem('expiryDate', expiryDate.toISOString());
        sessionStorage.setItem('token', result.data.token);
        sessionStorage.setItem('userId', result.data.userId);

        setAuth(true);

        history.replace('/');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const logoutHandler = () => {
    setAuth(false);

    sessionStorage.removeItem('expiryDate');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');

    history.replace('/login');
  };

  const signupHandler = (event, { loading, signupFormIsValid, signupForm }) => {
    event.preventDefault();

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
      });
  };

  return (
    <Fragment>
      <div className="App">
        <Header />
        <Nav isAuth={isAuth} logout={logoutHandler} />
      </div>
      <Switch>
        <Route path="/admin">
          <ArmorAdmin />
        </Route>

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
