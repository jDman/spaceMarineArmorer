import React, { Fragment } from 'react';

const PageTitle = (props) => {
  return (
    <Fragment>
      <h1>{props.title}</h1>
    </Fragment>
  );
};

export default PageTitle;
