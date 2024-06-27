import { NextResponse } from 'next/server';
import { saveUser } from '@api/server/_domain/authentication';

const parseUser = (user) => {
  const { _id, name, email } = user;

  return {
    id: _id,
    name,
    email,
  };
};

export async function POST(req) {
  const { name, email, password } = await req.json();

  const { status, user, message } = await saveUser({
    name,
    email,
    password,
  }).catch((error) => {
    console.log(error);
    return NextResponse.json({ user: null }, { status: 500 });
  });

  if (!user) return NextResponse.json({ user: null, message }, { status });

  return NextResponse.json({ user }, { status });
}
