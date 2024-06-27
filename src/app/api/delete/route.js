import { NextResponse } from 'next/server';
import {
  getUserByID,
  comparePassword,
  deleteUser,
} from '@api/server/_domain/authentication';

export async function POST(req) {
  const { id, password } = await req.json();

  if (!id || !password)
    return NextResponse.json({ isDeleted: false }, { status: 400 });

  const userModel = await getUserByID({ id });

  if (!userModel)
    return NextResponse.json({ isDeleted: false }, { status: 404 });

  const isPasswordCorrect = await comparePassword(userModel, password);

  if (!isPasswordCorrect) {
    return NextResponse.json({ isDeleted: false }, { status: 403 });
  }

  const { deletedCount } = await deleteUser({ userModel });

  if (deletedCount < 0)
    return NextResponse.json({ isDeleted: false }, { status: 500 });

  return NextResponse.json({ isDeleted: true }, { status: 200 });
}
