'use server';

import { compare } from 'bcrypt';

import { UserModel } from '@api/server/_models/user-model';
import { connectDB } from '@api/server/_config/database';

export const getUserByID = async ({ id }) => {
  await connectDB();

  const user = await UserModel.findOne({
    _id: id,
  });

  return user;
};
