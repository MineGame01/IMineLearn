import { client } from '@app/api/db';
import { emailAndPasswordSchema } from '@shared/model';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createAccessToken } from '@app/api/create-access-token';
import { createRefreshToken } from '@app/api/create-refresh-token';
import { IUser } from '@entities/User';

interface IDataRequest {
  email: string | null;
  password: string | null;
}

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const { email, password } = body as IDataRequest;

  const {
    value: loginCredentials,
    error,
    warning,
  } = emailAndPasswordSchema.validate({ password, email });

  if (error || warning) {
    return NextResponse.json({ message: error?.message ?? warning?.message }, { status: 401 });
  }

  const user = await client
    .db('db')
    .collection<IUser>('users')
    .findOne({ email: loginCredentials.email });

  if (user) {
    try {
      const getDerivedKey = async () => {
        return await new Promise<Buffer<ArrayBufferLike>>((resolve, reject) => {
          crypto.pbkdf2(
            loginCredentials.password,
            user.salt,
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

      const derivedKey = await getDerivedKey();

      if (
        !crypto.timingSafeEqual(
          Buffer.from(user.hash_password),
          Buffer.from(derivedKey.toString('hex'))
        )
      ) {
        return NextResponse.json({ message: 'Email or password is incorrect!' }, { status: 401 });
      } else {
        return NextResponse.json({
          access_token: createAccessToken(user),
          refresh_token: createRefreshToken(user._id),
          user_id: user._id,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json({ message: error.message }, { status: 401 });
      } else {
        throw error;
      }
    }
  } else {
    return NextResponse.json({ message: 'User not found!' }, { status: 401 });
  }
};
