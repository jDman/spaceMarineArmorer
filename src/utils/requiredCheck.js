const requiredCheck = (invalidValue) => (value) =>
  invalidValue ? value !== '' && value !== invalidValue : value !== '';

export default requiredCheck;
