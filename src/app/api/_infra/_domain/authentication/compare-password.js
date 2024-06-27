import bcrypt from 'bcrypt';

export const comparePassword = async (userModel, inputPassword) => {
  const { password } = userModel;

  const match = await bcrypt.compare(inputPassword, password);

  return match;
};
