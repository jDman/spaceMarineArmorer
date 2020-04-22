import requiredCheck from './requiredCheck';

describe('requiredCheck', () => {
  it('should return false if value an empty string', () => {
    const isValid = requiredCheck(null)('');

    expect(isValid).toBe(false);
  });

  it('should return false if value equals the set invalid value', () => {
    const isValid = requiredCheck('0')('0');

    expect(isValid).toBe(false);
  });

  it('should return true if value not an empty string', () => {
    const isValid = requiredCheck(null)('abc');

    expect(isValid).toBe(true);
  });

  it('should return true if value does not equal the set invalid value', () => {
    const isValid = requiredCheck('0')('1');

    expect(isValid).toBe(true);
  });
});
