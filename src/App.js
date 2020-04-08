import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from 'react-router-dom';

import './App.css';
import Header from './components/global/Header';
import Nav from './components/global/Nav';
import ArmorAdmin from './pages/admin/ArmorAdmin';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';

function App() {
  return (
    <Fragment>
      <Router>
        <div className="App">
          <Header />
          <Nav />
        </div>
        <Switch>
          <Route path="/admin">
            <ArmorAdmin />
          </Route>

          <Route path="/signup">
            <Signup />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/">
            <p>Home</p>
          </Route>

          <Redirect to="/" />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
