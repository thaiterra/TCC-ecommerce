'use server';

import { connectDB } from '@api/server/_config/database';

export const deleteUser = async ({ userModel }) => {
  await connectDB();

  const res = await userModel.deleteOne();

  return res;
};
