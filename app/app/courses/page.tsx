import getUserDetails from '@/lib/isAuth';
import CoursesPage from '@/components/course/CoursesPage';

export const metadata = {
  title: 'Courses',
  description:
    'Explore a wide range of courses available on our platform.  view course details, and find the perfect course to enhance your learning journey.',
};

export default async function Courses() {
  const user = await getUserDetails();

  return <CoursesPage role={user.role} />;
}
