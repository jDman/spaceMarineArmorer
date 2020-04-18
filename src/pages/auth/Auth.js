import React from 'react';

import classes from './Auth.module.css';

const Auth = (props) => {
  return <section className={classes.Auth}>{props.children}</section>;
};

export default Auth;
