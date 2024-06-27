'use server';

import { hash } from 'bcrypt';

import { UserModel } from '@api/server/_models/user-model';
import { connectDB } from '@api/server/_config/database';

export const saveUser = async ({ name, email, password }) => {
  await connectDB();
  const saltRounds = 10;

  const emailExists = await UserModel.findOne({
    email,
  });

  if (emailExists)
    return { status: 403, user: null, message: 'Email already used!' };

  const passwordHashed = await hash(password, saltRounds);

  const userModel = new UserModel({
    name,
    email,
    password: passwordHashed,
  });

  const user = await userModel.save();

  const savedUser = {
    id: user._id,
    name: user.name,
    email: user.email,
  };

  return {
    status: 200,
    user: savedUser,
  };
};
