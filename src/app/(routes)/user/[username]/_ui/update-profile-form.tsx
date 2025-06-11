import { useUpdateUserMutation } from '@app/api';
import { useAppDispatch } from '@app/lib';
import { UserUsernameSchema, UserBioSchema, TUserBio, TUserUserName } from '@entities/User';
import { joiResolver } from '@hookform/resolvers/joi';
import { getServerErrorMessage } from '@shared/model';
import { Input, Button, Textarea } from '@shared/ui';
import { addAuthData } from '@widgets/LoginModal';
import Joi from 'joi';
import { useRouter } from 'next/navigation';
import { Dispatch, FC, useEffect, useId } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IFormUpdateProfileInputs {
  username: TUserUserName;
  bio: TUserBio;
}

interface IProps {
  setIsUpdateProfile: Dispatch<boolean>;
  bio: TUserBio;
  username: TUserUserName;
}

export const UpdateProfileForm: FC<IProps> = ({ setIsUpdateProfile, bio, username }) => {
  const [updateUser, { isLoading: isLoadingUpdateUser, error: errorUpdateUser }] =
    useUpdateUserMutation();
  const { register, handleSubmit, formState, watch, setError } = useForm<IFormUpdateProfileInputs>({
    mode: 'onChange',
    defaultValues: { bio, username },
    resolver: joiResolver(
      Joi.object<IFormUpdateProfileInputs>({
        username: UserUsernameSchema.required(),
        bio: UserBioSchema.allow(null),
      })
    ),
  });

  const errorUpdateUserMessage = getServerErrorMessage(errorUpdateUser);

  useEffect(() => {
    if (errorUpdateUserMessage) {
      setError('root', { message: errorUpdateUserMessage });
    }
  }, [errorUpdateUserMessage, setError]);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const form_update_profile_id = useId();

  const { username: errorUsernameField, bio: errorBioField, root: errorForm } = formState.errors;

  const onSubmit: SubmitHandler<IFormUpdateProfileInputs> = (data) => {
    void updateUser(data)
      .unwrap()
      .then((response) => {
        dispatch(addAuthData(response));
        setIsUpdateProfile(false);
        router.push('/user/' + response.username);
      });
  };

  return (
    <div className="mt-5">
      <form
        id={form_update_profile_id}
        /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-1"
      >
        <Input
          label="Username"
          isError={Boolean(errorUsernameField)}
          helperText={errorUsernameField?.message}
          inputAttr={{
            required: true,
            value: watch('username'),
            ...register('username', { required: true }),
          }}
        />
        <Textarea
          placeholder="bio"
          value={watch('bio') ?? ''}
          isError={Boolean(errorBioField)}
          helperText={errorBioField?.message}
          {...register('bio', {
            required: false,
            setValueAs: (v: string | null) => {
              return v === '' ? null : v;
            },
          })}
        />
      </form>
      {errorForm && <div className="text-center text-error">{errorForm.message}</div>}
      <div className="flex gap-2 *:w-auto mt-2">
        <Button
          variant="contained"
          loading={isLoadingUpdateUser}
          formMethod="submit"
          type="submit"
          form={form_update_profile_id}
          disabled={!formState.isValid}
        >
          Submit
        </Button>
        <Button
          disabled={isLoadingUpdateUser}
          onClick={() => {
            setIsUpdateProfile(false);
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
