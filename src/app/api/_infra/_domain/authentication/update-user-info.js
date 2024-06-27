'use server';

import { hash } from 'bcrypt';

import { connectDB } from '@api/server/_config/database';

export const updateUserInfo = async ({ userModel, fieldsToChange }) => {
  await connectDB();

  fieldsToChange.map((field) => {
    const key = Object.keys(field)[0];
    const value = field[key];
    userModel[key] = value;
  });

  const saltRounds = 10;

  const hashedPassword = await hash(userModel.password, saltRounds);

  userModel.password = hashedPassword;

  userModel.save();

  const savedUser = {
    id: userModel._id,
    name: userModel.name,
    email: userModel.email,
  };

  return { isUpdated: true, savedUser };
};
