import { IUser, TProfile } from '@entities/User';
import { Button } from '@shared/ui';
import { FC, useState } from 'react';
import { UpdateProfileForm } from './update-profile-form';
import * as motion from 'motion/react-client';
import { AnimatePresence } from 'motion/react';
import { selectAuthUser, useAuthStore } from '@entities/auth';

export const AboutProfile: FC<
  Pick<TProfile, 'bio' | 'is_admin'> & Pick<IUser, 'id' | 'username'>
> = ({ id, username, bio, is_admin }) => {
  const [isUpdateProfile, setIsUpdateProfile] = useState(false);
  const authUserId = useAuthStore((state) => selectAuthUser(state)?.id);

  const is_owner_profile = authUserId === id;

  return (
    <div className="flex flex-col grow-1 lg:mt-1">
      <AnimatePresence mode="wait" initial={false}>
        {!isUpdateProfile && (
          <motion.div
            key="info-profile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span className={`font-bold ${is_admin ? 'text-error' : ''}`}>{username}</span>
            <p className="text-wrap break-all">{bio ?? 'No biography'}</p>
            {is_owner_profile && (
              <Button
                className="mt-2 w-auto lg:w-full"
                variant="contained"
                onClick={() => {
                  setIsUpdateProfile(true);
                }}
              >
                Change profile
              </Button>
            )}
            <ul className="mt-2 text-[0.9rem]"></ul>
          </motion.div>
        )}
        {isUpdateProfile && (
          <motion.div
            key="update-profile-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <UpdateProfileForm
              bio={bio}
              username={username}
              setIsUpdateProfile={setIsUpdateProfile}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
