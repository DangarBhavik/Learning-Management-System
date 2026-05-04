import { assignCourse, Course } from '@/services/apis/courses';
import queryClient from '@/utils/query-client';
import { useMutation } from '@tanstack/react-query';

export const useAssignCourse = ({
  userId,
  role,
}: {
  userId: string;
  role: 'TRAINEE' | 'MENTOR';
}) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: assignCourse,

    onSuccess: (data, variables) => {
      queryClient.setQueriesData(
        { queryKey: ['assignable-courses', userId, role] },
        (old: { courses: Course[] } | undefined) => {
          if (!old?.courses) return old;

          return {
            ...old,
            courses: old.courses.filter(course => !variables.courseIds.includes(course.id)),
          };
        }
      );

      queryClient.invalidateQueries({
        queryKey: ['assigned-courses', userId, role],
      });
      queryClient.invalidateQueries({
        queryKey: ['assignable-courses', userId, role],
      });
    },
  });

  const assignCourses = async ({ courseIds }: { courseIds: string[] }) => {
    return mutateAsync({
      courseIds,
      userId,
      role,
    });
  };

  return {
    assignCourses,
    isAssigning: isPending,
  };
};
