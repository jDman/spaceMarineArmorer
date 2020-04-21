import getClassOrClasses from './getClassOrClasses';

describe('getClassOrClasses', () => {
  it('should return a string from an array of strings', () => {
    const classNameArray = ['ABC', 'DEF', 'GHI'];

    const resultString = getClassOrClasses(classNameArray);

    expect(resultString).toBe('ABC DEF GHI');
  });

  it('should return a string when passed a string', () => {
    const classNameString = 'ABCDEFGHI';

    const resultString = getClassOrClasses(classNameString);

    expect(resultString).toBe('ABCDEFGHI');
  });

  it('should return an empty string when not passed a string or an array', () => {
    const classNameString = 567;

    const resultString = getClassOrClasses(classNameString);

    expect(resultString).toBe('');
  });
});
