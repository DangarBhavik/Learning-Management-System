import MyLearningsPage from '@/components/course/MyLearnings';
import getUserDetails from '@/lib/isAuth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Assigned Courses',
  description:
    'View your assigned courses. Track your learning progress, access course materials, and stay organized with your personalized course dashboard.',
};

const AssignedCoursesPage = async () => {
  const user = await getUserDetails();

  if (!user) {
    redirect('/auth/signin');
  }

  return <MyLearningsPage selectedUserId={user.id} />;
};

export default AssignedCoursesPage;
