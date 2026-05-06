'use client';
import CoursesLayout from '@/components/course/CoursesLayout';
import Courses from '@/components/ui/Courses';
import { useMyCourses } from '@/hooks/courses/useMyCourses';
import Link from 'next/link';

const AllCoursesPage = () => {
  const { myCourses, isLoading } = useMyCourses();

  return (
    <CoursesLayout
      title="Your Courses"
      isLoading={isLoading}
      headerRight={
        <Link href="/app/add-course">
          <button className="bg-blue-500 text-white px-3 py-1 rounded-md">+ Add Course</button>
        </Link>
      }
    >
      <Courses btnText="View Course" courses={myCourses} />
    </CoursesLayout>
  );
};

export default AllCoursesPage;
