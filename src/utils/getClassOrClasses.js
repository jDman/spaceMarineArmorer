const getClassOrClasses = (classes) => {
  return Array.isArray(classes)
    ? classes.join(' ')
    : typeof classes === 'string'
    ? classes
    : '';
};

export default getClassOrClasses;
