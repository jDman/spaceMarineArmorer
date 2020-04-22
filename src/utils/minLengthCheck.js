const minLengthCheck = (minLength) => (value) =>
  value.length >= minLength && true;

export default minLengthCheck;
