const maxLengthCheck = (maxLength) => (value) =>
  value.length <= maxLength && true;

export default maxLengthCheck;
