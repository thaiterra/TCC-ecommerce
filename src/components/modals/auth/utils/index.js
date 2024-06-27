export const validateUserFields = ({ email, name, password }) => {
  const errors = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isValidEmail = emailRegex.test(email);
  const isValidName = name.length > 0;
  const isValidPassword = password.length > 5;

  if (!isValidEmail) errors.push('email');
  if (isValidEmail) errors.pop('email');

  if (!isValidName) errors.push('name');
  if (isValidName) errors.pop('name');

  if (!isValidPassword) errors.push('password');
  if (isValidPassword) errors.pop('password');

  return {
    errors,
    isValid: isValidEmail && isValidName && isValidPassword,
  };
};
