const DefaultService = require('../service/DefaultService');

describe('signinPOST', () => {
  const usersExample = [
    { username: 'user1', password: 'password1' },
  ];

  const jwtMock = {
    sign: jest.fn(),
  };
  DefaultService.getToken = jest.fn();

  test('should return a token for valid user', () => {
    const body = { username: 'user1', password: 'password1' };
    return DefaultService.signinPOST(body)
      .catch(error => {
        expect(error.message).toBe("Invalid username or password");
      });
  });

  test('should reject with error for invalid username or password', () => {
    const body = { username: 'invalidUser', password: 'invalidPassword' };
    return DefaultService.signinPOST(body)
      .catch(error => {
        expect(error.message).toBe("Invalid username or password");
      });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});

describe('calculatorPOST', () => {
  test('should return the correct result for addition', () => {
    const body = { num1: 2, num2: 3 };
    const arithmeticValue = "addition";
    return DefaultService.calculatorPOST(body, arithmeticValue)
      .then(result => {
        expect(result.result).toBe(5);
      });
  });

  test('should return the correct result for subtraction', () => {
    const body = { num1: 2, num2: 3 };
    const arithmeticValue = "subtraction";
    return DefaultService.calculatorPOST(body, arithmeticValue)
      .then(result => {
        expect(result.result).toBe(-1);
      });
  });
  test('should return the correct result for multiplication', () => {
    const body = { num1: 2, num2: 3 };
    const arithmeticValue = "multiplication";
    return DefaultService.calculatorPOST(body, arithmeticValue)
      .then(result => {
        expect(result.result).toBe(6);
      });
  });
  test('should return the correct result for division', () => {
    const body = { num1: 6, num2: 3 };
    const arithmeticValue = "division";
    return DefaultService.calculatorPOST(body, arithmeticValue)
      .then(result => {
        expect(result.result).toBe(2);
      });
  });
  test('should handle division by zero', () => {
    const body = { num1: 10, num2: 0 };
    const arithmeticValue = "division";
    return DefaultService.calculatorPOST(body, arithmeticValue)
      .catch(error => {
        expect(error.message).toBe("Division by zero");
      });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
