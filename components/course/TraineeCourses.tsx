'use client';

import Courses from '@/components/ui/Courses';
import CoursesLayout from './CoursesLayout';
import { useCourses } from '@/hooks/courses/useCourses';

export default function TraineeCoursesPage() {
  const { courses, isFetching } = useCourses();

  return (
    <CoursesLayout
      title="My Courses"
      subtitle="Track, submit, and review your course work"
      isLoading={isFetching}
    >
      <Courses btnText="Continue Learning" courses={courses} />
    </CoursesLayout>
  );
}
