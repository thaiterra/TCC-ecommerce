import { NextResponse } from 'next/server';
import { getUserByEmail } from '@api/server/_domain/authentication';

export async function POST(req) {
  const { email, password } = await req.json();

  const { status, user, message } = await getUserByEmail({
    email,
    password,
  }).catch((error) => {
    console.log(error);
    return NextResponse.json(
      { user: null, message: 'Login error!' },
      { status: 500 }
    );
  });

  return NextResponse.json({ user, message }, { status });
}
