import AssignedCourses from '@/components/course-assignment/AssignedCourses';
import MyLearningsPage from '@/components/course/MyLearnings';
import getUserDetails from '@/lib/isAuth';
import { redirect } from 'next/navigation';

const AssignedCoursesPage = async () => {
  const user = await getUserDetails();

  if (!user) {
    redirect('/auth/signin');
  }

  return <MyLearningsPage selectedUserId={user.id} />;
};

export default AssignedCoursesPage;
