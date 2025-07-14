import { useAuthStore } from '@entities/auth';
import {
  UserUsernameSchema,
  TUserUserName,
  ProfileBioSchema,
  TProfileBio,
} from '@entities/User';
import { profileHooksApi } from '@entities/User/profile/api/profile-api-hooks';
import { joiResolver } from '@hookform/resolvers/joi';
import { Input, Button, Textarea } from '@shared/ui';
import { useQueryClient } from '@tanstack/react-query';
import Joi from 'joi';
import { useRouter } from 'next/navigation';
import { Dispatch, FC, useId } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IFormUpdateProfileInputs {
  username: TUserUserName;
  bio: TProfileBio;
}

interface IProps {
  setIsUpdateProfile: Dispatch<boolean>;
  bio: TProfileBio;
  username: TUserUserName;
}

export const UpdateProfileForm: FC<IProps> = ({ setIsUpdateProfile, bio, username }) => {
  const { register, handleSubmit, formState, watch, setError } = useForm<IFormUpdateProfileInputs>({
    mode: 'onChange',
    defaultValues: { bio, username },
    resolver: joiResolver(
      Joi.object<IFormUpdateProfileInputs>({
        username: UserUsernameSchema.required(),
        bio: ProfileBioSchema,
      })
    ),
  });

  const queryClient = useQueryClient();

  const { isPending: isPendingUpdateProfile, mutateAsync: updateProfile } =
    profileHooksApi.useUpdateProfileMutation({
      onError(error) {
        setError('root', { message: error.message });
      },
      async onSuccess(updatedProfile) {
        console.log(updatedProfile);

        setAuthUser({ username: updatedProfile.username });
        setAuthUserProfile({ bio: updatedProfile.bio });
        setIsUpdateProfile(false);

        router.push(`/user/${updatedProfile.username}`);

        await queryClient.invalidateQueries({ queryKey: ['user', 'user-profile', username] });
      },
    });

  const setAuthUser = useAuthStore((state) => state.setAuthUser);
  const setAuthUserProfile = useAuthStore((state) => state.setAuthUserProfile);

  const router = useRouter();
  const form_update_profile_id = useId();

  const { username: errorUsernameField, bio: errorBioField, root: errorForm } = formState.errors;

  const onSubmit: SubmitHandler<IFormUpdateProfileInputs> = async (data) => {
    await updateProfile(data);
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
          loading={isPendingUpdateProfile}
          formMethod="submit"
          type="submit"
          form={form_update_profile_id}
          disabled={!formState.isValid}
        >
          Submit
        </Button>
        <Button
          disabled={isPendingUpdateProfile}
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
