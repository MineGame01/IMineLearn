'use client';
import React, { FC, useState } from 'react';
import { TTypeAuth } from '@widgets/LoginModal/model/TTypeAuth.ts';
import { useAppDispatch, useAppSelector } from '@app/lib';
import { authLogin, selectAuthError, selectAuthIsLoading } from '@widgets/LoginModal';
import { ButtonSubmitAuth } from './button-submit-auth.tsx';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Input } from '@shared/ui';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthSchema, RegistrationSchema } from '@entities/LoginModal';
import { joiResolver } from '@hookform/resolvers/joi';

interface IAuthFormInputs {
  username: string;
  email: string;
  password: string;
  password_repeated: string;
}

export const AuthForm: FC<{
  typeAuth: TTypeAuth;
}> = ({ typeAuth }) => {
  const authError = useAppSelector(selectAuthError);
  const authIsLoading = useAppSelector(selectAuthIsLoading);
  const isAuthError = Boolean(authError);

  const dispatch = useAppDispatch();
  const [isVisibilityPassword, setIsVisibilityPassword] = useState(false);

  const { register, handleSubmit, formState, watch } = useForm<IAuthFormInputs>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      ...(typeAuth === 'registration' ? { username: '', password_repeated: '' } : {}),
    },
    resolver: typeAuth === 'login' ? joiResolver(AuthSchema) : joiResolver(RegistrationSchema),
  });

  const { errors, isValid } = formState;
  const { email, username, password, password_repeated } = errors;

  const isPasswordsMatch = watch('password') === watch('password_repeated');

  const onSubmit: SubmitHandler<IAuthFormInputs> = (data) => {
    console.log(isValid);
    if (isValid && (isPasswordsMatch || typeAuth === 'login')) {
      console.log(typeAuth);
      const { email, password, username } = data;
      dispatch(authLogin(email, password, username, typeAuth));
    }
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)} className="*:mt-3">
      {typeAuth === 'registration' && (
        <div>
          <Input
            inputAttr={{
              type: 'text',
              required: true,
              value: watch('username'),
              ...register('username'),
            }}
            isError={Boolean(username)}
            label={'Username'}
            helperText={username ? <span>{username.message}</span> : undefined}
          />
        </div>
      )}
      <div>
        <Input
          inputAttr={{
            autoFocus: true,
            type: 'email',
            required: true,
            value: watch('email'),
            ...register('email'),
          }}
          isError={Boolean(email?.message)}
          label={'Email'}
          helperText={email ? <span>{email.message}</span> : undefined}
        />
      </div>
      <div className="relative">
        <Input
          inputAttr={{
            type: isVisibilityPassword ? 'text' : 'password',
            required: true,
            value: watch('password'),
            ...register('password'),
          }}
          isError={Boolean(password)}
          label={'Password'}
          helperText={password ? <span>{password.message}</span> : undefined}
        />
        <button
          onClick={() => {
            setIsVisibilityPassword(!isVisibilityPassword);
          }}
          type="button"
          title={isVisibilityPassword ? 'Hide password' : 'Show password'}
          className="absolute top-[50%] right-0 transform-[translate(-50%,-50%)]"
        >
          {isVisibilityPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </button>
      </div>
      {typeAuth === 'registration' && (
        <div>
          <Input
            inputAttr={{
              type: isVisibilityPassword ? 'text' : 'password',
              required: true,
              value: watch('password_repeated'),
              ...register('password_repeated'),
            }}
            label={'Repeat password'}
            isError={!isPasswordsMatch || Boolean(password_repeated)}
            helperText={
              !isPasswordsMatch || password_repeated ? (
                <span>{password_repeated?.message ?? "Passwords don't match"}</span>
              ) : undefined
            }
          />
        </div>
      )}
      <ButtonSubmitAuth loading={authIsLoading} typeAuth={typeAuth} />
      {isAuthError && <div className="text-center text-error mt-2">{authError}</div>}
    </form>
  );
};
