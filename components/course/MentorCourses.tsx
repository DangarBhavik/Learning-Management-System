'use client';

import Courses from '@/components/ui/Courses';
import Link from 'next/link';
import CoursesLayout from './CoursesLayout';
import { useCourses } from '@/hooks/courses/useCourses';

export default function MentorCoursesPage() {
  const { courses, isFetching } = useCourses();
  return (
    <CoursesLayout
      title="Your Courses"
      isLoading={isFetching}
      headerRight={
        <Link href="/app/add-course">
          <button className="bg-blue-500 text-white px-3 py-1 rounded-md">+ Add Course</button>
        </Link>
      }
    >
      <Courses btnText="View Course" courses={courses} />
    </CoursesLayout>
  );
}
