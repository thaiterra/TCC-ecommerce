'use server';

import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
});

export const UserModel = models.user || model('user', userSchema);
