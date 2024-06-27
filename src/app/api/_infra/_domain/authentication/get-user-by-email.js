'use server';

import { compare } from 'bcrypt';

import { UserModel } from '@api/server/_models/user-model';
import { connectDB } from '@api/server/_config/database';

export const getUserByEmail = async ({ email, password }) => {
  await connectDB();

  const dbUser = await UserModel.findOne({
    email,
  });

  if (!dbUser) {
    return {
      status: 403,
      user: null,
      message: 'User not found!',
    };
  }

  const matcher = await compare(password, dbUser.password);

  if (!matcher) {
    return {
      status: 403,
      user: null,
      message: 'Incorrect password!',
    };
  }

  const parsedUser = {
    id: dbUser._id,
    name: dbUser.name,
    email: dbUser.email,
  };

  return {
    status: 200,
    user: parsedUser,
  };
};
