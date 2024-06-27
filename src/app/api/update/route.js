import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

import {
  getUserByID,
  updateUserInfo,
} from '@api/server/_domain/authentication';

export async function POST(req) {
  const { fields } = await req.json();
  const userID = headers().get('x-user-id');

  if (!userID) {
    return NextResponse.json(
      { isUpdated: false, message: 'User id not provided' },
      { status: 400 }
    );
  }

  //TODO change getUserById to a safer option, this returns the hashed password
  const user = await getUserByID({ id: userID }).catch((error) => {
    console.log(error);
    return NextResponse.json({ user: null }, { status: 500 });
  });

  const { isUpdated, savedUser } = await updateUserInfo({
    userModel: user,
    fieldsToChange: fields,
  });

  return NextResponse.json({ isUpdated, user: savedUser }, { status: 200 });
}
