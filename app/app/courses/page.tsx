import getUserDetails from '@/lib/isAuth';
import CoursesPage from '@/components/course/CoursesPage';

export default async function Courses() {
  const user = await getUserDetails();

  return <CoursesPage role={user.role} />;
}
