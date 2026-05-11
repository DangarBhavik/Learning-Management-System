import RoleBased from '@/components/RoleBased';
import getUserDetails from '@/lib/isAuth';
import AdminSubmissionsPage from '@/components/submissions/AdminSubmissions';
import TraineeSubmissionsPage from '@/components/submissions/TraineeSubmissions';

export const metadata = {
  title: 'Submissions',
  description:
    'View and manage all your submissions in one place. Track the status of your assignments, review feedback, and stay organized with your personalized submissions dashboard.',
};

export default async function SubmissionsPage() {
  const user = await getUserDetails();

  return (
    <RoleBased
      role={user.role}
      components={{
        ADMIN: AdminSubmissionsPage,
        MENTOR: TraineeSubmissionsPage,
        TRAINEE: TraineeSubmissionsPage,
      }}
    />
  );
}
