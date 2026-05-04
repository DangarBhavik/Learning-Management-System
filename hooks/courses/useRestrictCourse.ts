import { Course, restrictCourse } from '@/services/apis/courses';
import queryClient from '@/utils/query-client';
import { useMutation } from '@tanstack/react-query';

type CoursesResponse = {
  courses: Course[];
  pagination: {
    currentPage: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
};

const useRestrictCourse = ({ userId, role }: { userId: string; role: 'TRAINEE' | 'MENTOR' }) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: restrictCourse,

    onSuccess: (data, variables) => {
      queryClient.setQueriesData(
        { queryKey: ['assigned-courses', userId, role] },
        (old: CoursesResponse | undefined) => {
          if (!old?.courses) return old;

          return {
            ...old,
            courses: old.courses.filter(course => !variables.courseIds.includes(course.id)),
          };
        }
      );

      queryClient.invalidateQueries({
        queryKey: ['assignable-courses', userId, role],
      });
      queryClient.invalidateQueries({
        queryKey: ['assigned-courses', userId, role],
      });
    },
  });

  const handleRestrictCourse = async ({ courseIds }: { courseIds: string[] }) => {
    return mutateAsync({
      courseIds,
      userId,
      role,
    });
  };

  return {
    restrictCourse: handleRestrictCourse,
    isTakingAccess: isPending,
  };
};

export default useRestrictCourse;
