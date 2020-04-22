import minLengthCheck from './minLengthCheck';

describe('minLengthCheck', () => {
  it('should return false if value not at least the necessary minimum value', () => {
    const minimumValue = 5;
    const value = 'abc';

    const validMinimum = minLengthCheck(minimumValue)(value);

    expect(validMinimum).toBe(false);
  });

  it('should return true if value at least the necessary minimum value', () => {
    const minimumValue = 5;
    const value = 'abcde';

    const validMinimum = minLengthCheck(minimumValue)(value);

    expect(validMinimum).toBe(true);
  });

  it('should return true if value greater than the necessary minimum value', () => {
    const minimumValue = 5;
    const value = 'abcdef';

    const validMinimum = minLengthCheck(minimumValue)(value);

    expect(validMinimum).toBe(true);
  });
});
