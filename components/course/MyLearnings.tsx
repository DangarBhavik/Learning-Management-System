'use client';
import useGetAssignedCourses from '@/hooks/courses/useGetAssignedCourses';
import CoursesLayout from './CoursesLayout';
import Courses from '../ui/Courses';

const MyLearningsPage = ({ selectedUserId }: { selectedUserId: string }) => {
  const { courseData, isLoading } = useGetAssignedCourses({
    userId: selectedUserId,
    page: 1,
  });

  return (
    <CoursesLayout title="My Learnings" count={courseData?.courses.length || 0}>
      {isLoading ? (
        <p className="h-full">Loading....</p>
      ) : (
        <>
          {courseData.courses.length > 0 && (
            <Courses courses={courseData.courses} btnText="View Course" />
          )}
        </>
      )}
    </CoursesLayout>
  );
};

export default MyLearningsPage;
