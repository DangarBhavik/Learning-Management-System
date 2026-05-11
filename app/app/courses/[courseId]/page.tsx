import getUserDetails from '@/lib/isAuth';
import CourseDetailsPage from '@/components/course/course-details/CourseDetailsPage';

type PageProps = {
  params: {
    courseId: string;
  };
};

export const metadata = {
  title: 'Course Details',
  description: 'View detailed information about your course, modules, and assignments',
};

export default async function CoursesDetailsPage({ params }: PageProps) {
  const user = await getUserDetails();

  return <CourseDetailsPage role={user.role} userId={user.id} params={Promise.resolve(params)} />;
}
