import { type MentorOption, type AdminUserDetails } from '@/services/apis/users';
import { userRoleCheck } from '@/utils/checkUserRole';
import { RoleSelect } from './RoleSelect';
import { MentorSelect } from './MentorSelect';

type UserRole = AdminUserDetails['role'];

type UserEditFormProps = {
  role: UserRole;
  mentorId: string;
  mentors: MentorOption[];
  mentorsLoading: boolean;
  onRoleChange: (role: UserRole) => void;
  onMentorChange: (mentorId: string) => void;
};

export function UserEditForm({
  role,
  mentorId,
  mentors,
  mentorsLoading,
  onRoleChange,
  onMentorChange,
}: UserEditFormProps) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <RoleSelect value={role} onChange={onRoleChange} />

      {userRoleCheck.isTrainee(role) && (
        <MentorSelect
          value={mentorId}
          mentors={mentors}
          isLoading={mentorsLoading}
          onChange={onMentorChange}
        />
      )}
    </div>
  );
}
