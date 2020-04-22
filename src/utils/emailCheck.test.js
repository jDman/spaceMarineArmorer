import emailCheck from './emailCheck';

describe('emailCheck', () => {
  it('should return false if value not a valid email', () => {
    const invalidEmail = 'abc';

    const isValid = emailCheck(invalidEmail);

    expect(isValid).toBe(false);
  });

  it('should return true if value a valid email', () => {
    const validEmail = 'abc@test.com';

    const isValid = emailCheck(validEmail);

    expect(isValid).toBe(true);
  });
});
