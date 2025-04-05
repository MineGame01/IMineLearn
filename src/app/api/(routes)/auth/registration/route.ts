import { emailAndPasswordSchema } from '@shared/model';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { IUser, UserSchema } from '@entities/User';
import { client } from '@app/api/db';
import { createAccessToken } from '@app/api/create-access-token';
import { createRefreshToken } from '@app/api/create-refresh-token';

interface IBodyRequest {
  email: string | null;
  password: string | null;
  username: string | null;
}

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const { email, password, username } = body as IBodyRequest;

  const usersCollection = client.db('db').collection<IUser>('users');

  if (username) {
    const user = await usersCollection.findOne({ username });
    if (user) {
      return NextResponse.json({ message: 'Username already in use!' }, { status: 401 });
    }
  } else {
    return NextResponse.json({ message: 'Username is required!' }, { status: 401 });
  }

  const {
    error: errorLoginCredentialsValidate,
    warning: warningLoginCredentialsValidate,
    value: loginCredentialsValidate,
  } = emailAndPasswordSchema.validate({ email, password });

  if (errorLoginCredentialsValidate || warningLoginCredentialsValidate) {
    return NextResponse.json(
      {
        message: errorLoginCredentialsValidate?.message ?? warningLoginCredentialsValidate?.message,
      },
      { status: 401 }
    );
  }

  const salt = crypto.randomBytes(16).toString('hex');

  const derivedKey = async () => {
    return new Promise<Buffer<ArrayBufferLike>>((resolve, reject) => {
      crypto.pbkdf2(
        loginCredentialsValidate.password,
        salt,
        1000,
        64,
        'sha512',
        async (error, derivedKey) => {
          if (error) reject(error);
          else resolve(derivedKey);
        }
      );
    });
  };

  try {
    const hashPassword = (await derivedKey()).toString('hex');

    const {
      error: errorUserValidate,
      warning: warningUserValidate,
      value: userValidate,
    } = UserSchema.validate({
      username,
      email: loginCredentialsValidate.email,
      hash_password: hashPassword,
      salt,
    });

    if (errorUserValidate || warningUserValidate) {
      return NextResponse.json(
        { message: errorUserValidate?.message ?? warningUserValidate?.message },
        { status: 401 }
      );
    }

    const newUser = await usersCollection.insertOne(userValidate as IUser);
    const newUserId = newUser.insertedId;

    return NextResponse.json({
      access_token: createAccessToken({ ...userValidate, _id: newUserId }),
      refresh_token: createRefreshToken(newUserId),
      user_id: newUserId,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    } else {
      throw error;
    }
  }
};
