import maxLengthCheck from './maxLengthCheck';

describe('maxLength', () => {
  it('should return false if value greater than the maximum value', () => {
    const maximumValue = 5;
    const value = 'abcdefg';

    const validMax = maxLengthCheck(maximumValue)(value);

    expect(validMax).toBe(false);
  });

  it('should return true if value equals the necessary maximum value', () => {
    const maximumValue = 5;
    const value = 'abcde';

    const validMax = maxLengthCheck(maximumValue)(value);

    expect(validMax).toBe(true);
  });

  it('should return true if value less than the necessary maximum value', () => {
    const maximumValue = 5;
    const value = 'abcd';

    const validMax = maxLengthCheck(maximumValue)(value);

    expect(validMax).toBe(true);
  });
});
