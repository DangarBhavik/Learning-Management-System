import RoleBased from '@/components/RoleBased';
import getUserDetails from '@/lib/isAuth';
import AdminDashBoard from '@/components/dashboard/admin-dashboard/AdminDashBoard';
import MentorDashBoard from '@/components/dashboard/mentor-dashboard/MentorDashBoard';
import TraineeDashBoard from '@/components/dashboard/trainee-dashboard/TraineeDashBoard';

export const metadata = {
  title: 'Dashboard',
  description: 'Your personalized dashboard to manage courses, assignments, and progress.',
};

export default async function DashboardPage() {
  const user = await getUserDetails();

  return (
    <RoleBased
      role={user.role}
      components={{
        ADMIN: AdminDashBoard,
        MENTOR: MentorDashBoard,
        TRAINEE: TraineeDashBoard,
      }}
    />
  );
}
