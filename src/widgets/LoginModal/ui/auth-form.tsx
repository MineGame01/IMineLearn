'use client';
import React, { FC, useState } from 'react';
import { TTypeAuth } from '@widgets/LoginModal/model/TTypeAuth.ts';
import { ButtonSubmitAuth } from './button-submit-auth.tsx';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Input } from '@shared/ui';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthSchema, RegistrationSchema } from '@entities/LoginModal';
import { joiResolver } from '@hookform/resolvers/joi';
import { authApiHooks } from '@entities/auth/api/auth-api-hooks.ts';

interface IAuthFormInputs {
  username: string;
  email: string;
  password: string;
  password_repeated: string;
}

export const AuthForm: FC<{
  typeAuth: TTypeAuth;
  close: () => void;
}> = ({ typeAuth, close }) => {
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

  const {
    mutate: login,
    isPending: isPendingLogin,
    isError: isErrorLogin,
    error: errorLogin,
  } = authApiHooks.useLoginMutation({
    onSuccess() {
      close();
    },
  });
  const {
    mutate: registration,
    isPending: isPendingRegistration,
    isError: isErrorRegistration,
    error: errorRegistration,
  } = authApiHooks.useRegistrationMutation({
    onSuccess() {
      close();
    },
  });

  const { errors, isValid } = formState;
  const { email, username, password, password_repeated } = errors;

  const isErrorAuth = isErrorLogin || isErrorRegistration;
  const isPendingAuth = isPendingRegistration || isPendingLogin;
  const errorAuth = errorLogin?.message ?? errorRegistration?.message;

  const isPasswordsMatch = watch('password') === watch('password_repeated');

  const onSubmit: SubmitHandler<IAuthFormInputs> = (data) => {
    if (isValid && (isPasswordsMatch || typeAuth === 'login')) {
      const { email, password, username } = data;
      if (typeAuth === 'login') login({ email, password });
      else registration({ email, password, username });
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
      <ButtonSubmitAuth loading={isPendingAuth} typeAuth={typeAuth} />
      {isErrorAuth && <div className="text-center text-error mt-2">{errorAuth}</div>}
    </form>
  );
};
