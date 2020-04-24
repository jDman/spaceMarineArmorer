import React from 'react';

import getClassOrClasses from '../../utils/getClassOrClasses';

const Button = (props) => {
  const type = props.type || 'button';

  const classString = getClassOrClasses(props.classes);

  return (
    <button
      type={type}
      className={classString}
      disabled={props.disabled || props.loading}
      onClick={(event) =>
        props.clickHandler ? props.clickHandler(event) : () => {}
      }
    >
      {props.buttonText}
    </button>
  );
};

export default Button;
