'use client';

import { useState } from 'react';
import { type AdminUserDetails } from '@/services/apis/users';
import { useUpdateUser } from '@/hooks/user/useUpdateUser';
import { useMentors } from '@/hooks/user/useMentors';
import { userRoleCheck } from '@/utils/checkUserRole';
import { UserHeader } from './UserHeader';
import { UserEditForm } from './UserEditForm';
import { UserInfoGrid } from './UserInfoGrid';
import { ErrorMessage } from './ErrorMessage';

export default function UserDetails({ user }: { user: AdminUserDetails }) {
  const [isEditing, setIsEditing] = useState(false);
  const [role, setRole] = useState<AdminUserDetails['role']>(() => user.role);
  const [mentorId, setMentorId] = useState<string>(() => user.mentorId ?? '');
  const [formError, setFormError] = useState<string | null>(null);

  const { data: mentors = [], isLoading: mentorsLoading } = useMentors({
    enabled: isEditing && userRoleCheck.isTrainee(role),
  });

  const updateMutation = useUpdateUser(user.id);

  const handleSave = async () => {
    try {
      setFormError(null);

      if (userRoleCheck.isTrainee(role) && !mentorId) {
        setFormError('Please assign a mentor for trainee');
        return;
      }

      const updated = await updateMutation.mutateAsync({
        role,
        mentorId: userRoleCheck.isTrainee(role) ? mentorId : null,
      });

      setRole(updated.role);
      setMentorId(updated.mentorId ?? '');
      setIsEditing(false);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Failed to update user');
    }
  };

  const handleCancel = () => {
    setRole(user.role);
    setMentorId(user.mentorId ?? '');
    setFormError(null);
    setIsEditing(false);
  };

  const startEditing = () => {
    setRole(user.role);
    setMentorId(user.mentorId ?? '');
    setFormError(null);
    setIsEditing(true);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <UserHeader
        user={user}
        currentRole={role}
        isEditing={isEditing}
        isPending={updateMutation.isPending}
        onEdit={startEditing}
        onCancel={handleCancel}
        onSave={handleSave}
      />

      {isEditing && (
        <UserEditForm
          role={role}
          mentorId={mentorId}
          mentors={mentors}
          mentorsLoading={mentorsLoading}
          onRoleChange={setRole}
          onMentorChange={setMentorId}
        />
      )}

      <ErrorMessage message={formError} />

      <div className="mb-6 border-t border-gray-200 dark:border-gray-800" />

      <UserInfoGrid user={user} mentors={mentors} />
    </div>
  );
}
