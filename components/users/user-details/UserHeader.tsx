import Image from 'next/image';
import { type AdminUserDetails } from '@/services/apis/users';
import { ActionButtons } from './ActionButtons';
import { RoleBadge } from './RoleBadge';

const roleStyles = {
  ADMIN: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  MENTOR: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  TRAINEE: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
};

type UserHeaderProps = {
  user: AdminUserDetails;
  currentRole: AdminUserDetails['role'];
  isEditing: boolean;
  isPending: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
};

export function UserHeader({
  user,
  currentRole,
  isEditing,
  isPending,
  onEdit,
  onCancel,
  onSave,
}: UserHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-5">
        <UserAvatar username={user.username} image={user.image} />

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {user.username}
            </h2>
            <RoleBadge role={currentRole} styles={roleStyles} />
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
        </div>
      </div>

      <ActionButtons
        isEditing={isEditing}
        isPending={isPending}
        onEdit={onEdit}
        onCancel={onCancel}
        onSave={onSave}
      />
    </div>
  );
}

type UserAvatarProps = {
  username: string;
  image?: string | null;
};

function UserAvatar({ username, image }: UserAvatarProps) {
  return (
    <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
      {image ? (
        <Image
          src={image}
          alt={username}
          width={80}
          height={80}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="text-2xl font-bold text-gray-500">{username.charAt(0).toUpperCase()}</span>
      )}
    </div>
  );
}
