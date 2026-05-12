import { useMemo } from 'react';
import { type AdminUserDetails, type MentorOption } from '@/services/apis/users';
import { userRoleCheck } from '@/utils/checkUserRole';
import { DetailItem } from './DetailItem';

type UserInfoGridProps = {
  user: AdminUserDetails;
  mentors: MentorOption[];
};

export function UserInfoGrid({ user, mentors }: UserInfoGridProps) {
  const selectedMentorLabel = useMemo(() => {
    if (!user.mentorId) return 'No mentor assigned';
    const mentor = mentors.find(item => item.id === user.mentorId);
    return mentor?.username ?? user.mentorName ?? 'Mentor assigned';
  }, [mentors, user.mentorId, user.mentorName]);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <DetailItem label="User ID" value={user.id} />

      {userRoleCheck.isTrainee(user.role) && (
        <DetailItem label="Mentor" value={selectedMentorLabel} />
      )}

      <DetailItem label="Created At" value={formatDate(user.createdAt)} />
      <DetailItem label="Last Updated" value={formatDate(user.updatedAt)} />
    </div>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}
