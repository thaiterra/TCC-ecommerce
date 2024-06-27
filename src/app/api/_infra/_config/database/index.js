'use server';

import mongoose from 'mongoose';

export const connectDB = async () => {
  if (mongoose.connections[0].readyState) return true;

  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log('Connected DB');
    })
    .catch((err) => {
      console.log(err);
    });
};
