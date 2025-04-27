'use client';
import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { TTypeAuth } from '@widgets/LoginModal/model/TTypeAuth.ts';
import { useAppDispatch, useAppSelector } from '@app/lib';
import { authLogin, selectAuthError, selectAuthIsLoading } from '@widgets/LoginModal';
import { ButtonSubmitAuth } from './button-submit-auth.tsx';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Input } from '@shared/ui';

export const AuthForm: FC<{
  typeAuth: TTypeAuth;
}> = ({ typeAuth }) => {
  const authError = useAppSelector(selectAuthError);
  const authIsLoading = useAppSelector(selectAuthIsLoading);
  const isAuthError = Boolean(authError);

  const dispatch = useAppDispatch();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordRepeated, setPasswordRepeated] = useState<string>('');
  const [isVisibilityPassword, setIsVisibilityPassword] = useState(false);

  const isPasswordsMatch = password === passwordRepeated;

  const handleChangeState = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    typeChange: 'email' | 'password' | 'passwordRepeated' | 'username'
  ) => {
    const valueInput = event.currentTarget.value;

    switch (typeChange) {
      case 'username': {
        setUsername(valueInput);
        return;
      }
      case 'email': {
        setEmail(valueInput);
        return;
      }
      case 'password': {
        setPassword(valueInput);
        return;
      }
      case 'passwordRepeated': {
        setPasswordRepeated(valueInput);
        return;
      }
    }
  };

  const handleSubmitAuth: React.FormEventHandler = (event) => {
    event.preventDefault();

    if (isPasswordsMatch || typeAuth === 'login') {
      dispatch(authLogin(email, password, username, typeAuth));
    }
  };

  return (
    <form onSubmit={handleSubmitAuth} className="*:mt-3">
      {typeAuth === 'registration' && (
        <Input
          inputAttr={{
            type: 'text',
            required: true,
            value: username,
            onChange: (event) => handleChangeState(event, 'username'),
          }}
          label={'Username'}
          helperText={isAuthError ? <span>Please check username for uniqueness</span> : undefined}
        />
      )}
      <Input
        inputAttr={{
          autoFocus: true,
          value: email,
          onChange: (event) => handleChangeState(event, 'email'),
          type: 'email',
          required: true,
        }}
        isError={isAuthError}
        label={'Email'}
        helperText={isAuthError ? <span>Please check that your email is correct</span> : undefined}
      />
      <div className="relative">
        <Input
          inputAttr={{
            value: password,
            onChange: (event) => handleChangeState(event, 'password'),
            type: isVisibilityPassword ? 'text' : 'password',
            required: true,
          }}
          isError={isAuthError}
          label={'Password'}
          helperText={isAuthError ? <span>Please check your password</span> : undefined}
        />
        <button
          onClick={() => {
            setIsVisibilityPassword(!isVisibilityPassword);
          }}
          type="button"
          className="absolute top-[50%] right-0 transform-[translate(-50%,-50%)]"
        >
          {isVisibilityPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </button>
      </div>
      {typeAuth === 'registration' && (
        <Input
          inputAttr={{
            value: passwordRepeated,
            onChange: (event) => {
              handleChangeState(event, 'passwordRepeated');
            },
            type: isVisibilityPassword ? 'text' : 'password',
            required: true,
          }}
          label={'Repeat password'}
          isError={!isPasswordsMatch}
          helperText={!isPasswordsMatch ? <span>Passwords don't match</span> : undefined}
        />
      )}
      <ButtonSubmitAuth loading={authIsLoading} typeAuth={typeAuth} />
      {isAuthError && <div className="text-center text-error mt-2">{authError}</div>}
    </form>
  );
};
